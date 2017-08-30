import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/styles.css';

import {AppContainer as ReactHotLoader} from 'react-hot-loader';
import {AsyncComponentProvider} from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RouterWrapper from './RouterWrapper';
import ProviderService from './services/ProviderService';
import IStore from './interfaces/stores/IStore';
import ISagaStore from './interfaces/stores/ISagaStore';

const rehydrateState = window.__ASYNC_COMPONENTS_STATE__;
const initialState: IStore = {
    ...window.__STATE__,
    renderReducer: {
        isServerSide: false,
    },
};
const store: ISagaStore<IStore> = ProviderService.createProviderStore(initialState);
const rootEl: HTMLElement = document.getElementById('root');

delete window.__STATE__;
delete window.__ASYNC_COMPONENTS_STATE__;

const composeApp = (Component: any) => (
    <ReactHotLoader key={Math.random()}>
        <AsyncComponentProvider rehydrateState={rehydrateState}>
            <Component store={store} />
        </AsyncComponentProvider>
    </ReactHotLoader>
);

const renderApp = () => {
    const routerWrapper = require('./RouterWrapper').default; // eslint-disable-line global-require

    ReactDOM.render(
        composeApp(routerWrapper),
        rootEl,
    );
};

asyncBootstrapper(composeApp(RouterWrapper)).then(renderApp);

if (module.hot) {
    module.hot.accept('./RouterWrapper', renderApp);
}
