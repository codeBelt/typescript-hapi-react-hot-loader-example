import {renderToString} from 'react-dom/server';
import {AsyncComponentProvider, createAsyncContext} from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import * as serialize from 'serialize-javascript';
import * as path from 'path';
import * as fse from 'fs-extra';
import * as React from 'react';
import * as Hapi from 'hapi';
import RouterWrapper from '../../RouterWrapper';
import ProviderService from '../../services/ProviderService';
import rootSaga from '../../stores/rootSaga';
import ISagaStore from '../../stores/ISagaStore';
import IStore from '../../stores/IStore';
import IController from './IController';

class ReactController implements IController {

    private _html: string = null;

    public mapRoutes(server: Hapi.Server): void {
        server.route({
            method: 'GET',
            path: '/{route*}',
            handler: async (request: Hapi.Request, reply: Hapi.ReplyNoContinue): Promise<void> => {
                const store: ISagaStore<IStore> = ProviderService.createProviderStore({}, true);
                const asyncContext: any = createAsyncContext();
                const routeContext: any = {};
                const app = (
                    <AsyncComponentProvider asyncContext={asyncContext}>
                        <RouterWrapper
                            store={store}
                            location={request.path}
                            context={routeContext}
                            isServerSide={true}
                        />
                    </AsyncComponentProvider>
                );

                this._html = (this._html === null) ? await this._loadHtmlFile() : this._html;

                await asyncBootstrapper(app);

                store.runSaga(rootSaga).done.then(() => {
                    if (routeContext.url) {
                        return reply().redirect(routeContext.url);
                    }

                    const renderedHtml: string = renderToString(app);
                    const asyncComponentsState: IStore = asyncContext.getState();
                    const state: IStore = store.getState();

                    const initialState: IStore = {
                        ...state,
                        renderReducer: {
                            isServerSide: true,
                        },
                    };

                    const html: string = this._html
                        .slice(0)
                        .replace('{title}', initialState.metaReducer.title)
                        .replace('{description}', initialState.metaReducer.description)
                        .replace('{content}', renderedHtml)
                        .replace('{state}', JSON.stringify(initialState))
                        .replace('{asyncComponentsState}', serialize(asyncComponentsState));

                    return reply(html);
                }).catch((error: Error) => {
                    reply(error.toString());
                });

                renderToString(app);

                store.endSaga();
            },
        });
    }

    private async _loadHtmlFile(): Promise<string> {
        const htmlPath = path.resolve(__dirname, '../../public/index.html');

        return fse.readFile(htmlPath, 'utf8');
    }

}

export default ReactController;
