import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/styles.css';

import {AppContainer} from 'react-hot-loader';
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

const render = (Component: any) =>
    ReactDOM.render(
        <AppContainer>
            <Component store={store} />
        </AppContainer>,
        rootEl,
    );

render(RouterWrapper);

if (module.hot) {
    module.hot.accept('./RouterWrapper', () => render(RouterWrapper));
}
