import {renderToString} from 'react-dom/server';
import * as path from 'path';
import * as fse from 'fs-extra';
import * as React from 'react';
import RouterWrapper from '../../RouterWrapper';
import ProviderService from '../../services/ProviderService';
import rootSaga from '../../store/rootSaga';
import ISagaStore from '../../interfaces/ISagaStore';
import IStore from '../../interfaces/IStore';
import * as Hapi from 'hapi';
import IController from '../../interfaces/IController';

class ReactController implements IController {

    public mapRoutes(server: Hapi.Server): void {
        server.route({
            method: 'GET',
            path: '/{route*}',
            handler: async (request: Hapi.Request, reply: Hapi.ReplyNoContinue): Promise<void> => {
                const store: ISagaStore<IStore> = ProviderService.createProviderStore({}, true);
                const context: any = {};
                const app = (
                    <RouterWrapper
                        store={store}
                        location={request.path}
                        context={context}
                        isServerSide={true}
                    />
                );

                store.runSaga(rootSaga).done.then(async () => {
                    const renderedHtml: string = renderToString(app);
                    const state: IStore = store.getState();
                    const initialState: IStore = {
                        ...state,
                        renderReducer: {
                            isServerSide: true,
                        },
                    };

                    let html: string = await fse.readFile(path.resolve(__dirname, '../../public/index.html'), 'utf8');
                    html = html.replace('{title}', state.metaReducer.title);
                    html = html.replace('{description}', state.metaReducer.description);
                    html = html.replace('{content}', renderedHtml);
                    html = html.replace('{state}', JSON.stringify(initialState));

                    // context.url will contain the URL to redirect to if a <Redirect> was used
                    if (context.url) {
                        // TODO: figure out redirects
                        reply(context.url);
                    } else {
                        reply(html);
                    }
                });

                renderToString(app);

                store.endSaga();
            },
        });
    }

}

export default ReactController;
