import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/styles.css';

import {AppContainer as ReactHotLoader} from 'react-hot-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RouterWrapper from './RouterWrapper';
import ProviderService from './services/ProviderService';
import IStore from './interfaces/store/IStore';
import ISagaStore from './interfaces/store/ISagaStore';

const initialState: IStore = {
    ...window.__STATE__,
    renderReducer: {
        isServerSide: false,
    },
};
const store: ISagaStore<IStore> = ProviderService.createProviderStore(initialState);
const rootEl: HTMLElement = document.getElementById('root');

delete window.__STATE__;

const renderApp = (Component: any) =>
    ReactDOM.render(
        <ReactHotLoader>
            <Component store={store} />
        </ReactHotLoader>,
        rootEl,
    );

renderApp(RouterWrapper);

if (module.hot) {
    module.hot.accept('./RouterWrapper', () => renderApp(require('./RouterWrapper').default)); // eslint-disable-line global-require
}
