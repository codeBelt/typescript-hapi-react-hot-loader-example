import {renderToString} from 'react-dom/server';
import {AsyncComponentProvider, createAsyncContext} from 'react-async-component';
import * as bootstrap from 'react-async-bootstrapper';
import * as serialize from 'serialize-javascript';
import * as React from 'react';
import * as Hapi from 'hapi';
import RouterWrapper from '../../RouterWrapper';
import ProviderUtility from '../../utilities/ProviderUtility';
import ServerUtility from '../utilities/ServerUtility';
import rootSaga from '../../stores/rootSaga';
import ISagaStore from '../../stores/ISagaStore';
import IStore from '../../stores/IStore';
import IController from './IController';
import IRenderReducerState from '../../stores/render/IRenderReducerState';
import RequestMethodEnum from '../../constants/RequestMethodEnum';
import {createMemoryHistory, History} from 'history';

export default class ReactController implements IController {

    private _html: string = null;

    public mapRoutes(server: Hapi.Server): void {
        server.route({
            method: RequestMethodEnum.Get,
            path: '/{route*}',
            handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
                let initialState: Partial<IStore> = {renderReducer: this._getRenderReducer(request)};
                const history: History = createMemoryHistory();
                const isServerSide: boolean = true;
                const store: ISagaStore = ProviderUtility.createProviderStore(initialState, history, isServerSide);
                const asyncContext: any = createAsyncContext();
                const routeContext: any = {};
                const helmetContext: any = {};

                const app = (
                    <AsyncComponentProvider asyncContext={asyncContext}>
                        <RouterWrapper
                            store={store}
                            location={request.path}
                            context={routeContext}
                            helmetContext={helmetContext}
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
                    const {helmet} = helmetContext;
                    const asyncComponentsState: IStore = asyncContext.getState();
                    const state: IStore = store.getState();

                    initialState = {
                        ...state,
                        renderReducer: this._getRenderReducer(request),
                    };
                    console.log(`helmet`, helmet);

                    const html: string = this._html
                        .slice(0)
                        .replace('{title}', helmet.title.toString())
                        .replace('{meta}', helmet.meta.toString())
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

    private _getRenderReducer(request: Hapi.Request): IRenderReducerState {
        return {
            isServerSide: true,
            serverSideLocation: ServerUtility.createLocationObject(request),
        };
    }

}
