import {renderToString} from 'react-dom/server';
import {AsyncComponentProvider, createAsyncContext} from 'react-async-component';
import * as bootstrap from 'react-async-bootstrapper';
import * as serialize from 'serialize-javascript';
import * as React from 'react';
import * as Hapi from 'hapi';
import RouterWrapper from '../../RouterWrapper';
import ProviderUtility from '../../utilities/ProviderUtility';
import rootSaga from '../../stores/rootSaga';
import ISagaStore from '../../stores/ISagaStore';
import IStore from '../../stores/IStore';
import IController from './IController';
import RequestMethodEnum from '../../constants/RequestMethodEnum';
import ServerUtility from '../utilities/ServerUtility';

class ReactController implements IController {

    private _html: string = null;

    public mapRoutes(server: Hapi.Server): void {
        server.route({
            method: RequestMethodEnum.GET,
            path: '/{route*}',
            handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
                const store: ISagaStore = ProviderUtility.createProviderStore({}, null, true);
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

                this._html = (this._html === null) ? await ServerUtility.loadHtmlFile() : this._html;

                await bootstrap(app);

                const sagaDone: Promise<any> = store.runSaga(rootSaga).done;

                renderToString(app);

                store.endSaga();

                await sagaDone;

                if (routeContext.url) {
                    return h.redirect(routeContext.url);
                }

                try {
                    const renderedHtml: string = renderToString(app);
                    const asyncComponentsState: IStore = asyncContext.getState();
                    const state: IStore = store.getState();

                    const initialState: IStore = {
                        ...state,
                        renderReducer: {
                            isServerSide: true,
                            serverSideLocation: ServerUtility.createLocationObject(request),
                        },
                    };

                    const html: string = this._html
                        .slice(0)
                        .replace('{title}', initialState.metaReducer.title)
                        .replace('{description}', initialState.metaReducer.description)
                        .replace('{content}', renderedHtml)
                        .replace('{state}', JSON.stringify(initialState))
                        .replace('{asyncComponentsState}', serialize(asyncComponentsState));

                    return h.response(html);
                } catch (error) {
                    return error.toString();
                }
            },
        });
    }

}

export default ReactController;
