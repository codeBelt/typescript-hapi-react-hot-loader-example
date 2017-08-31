import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../stores/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware, {END, SagaMiddleware} from 'redux-saga';
import rootSaga from '../stores/rootSaga';
import IStore from '../interfaces/stores/IStore';
import ISagaStore from '../interfaces/stores/ISagaStore';

class ProviderService {

    public static createProviderStore(initialState: any = {}, isServerSide: boolean = false): ISagaStore<IStore> {
        const sagaMiddleware: SagaMiddleware<any> = createSagaMiddleware();

        const store = createStore(
            rootReducer,
            initialState,
            composeWithDevTools(applyMiddleware(sagaMiddleware)),
        ) as ISagaStore<IStore>;

        if (isServerSide) {
            store.runSaga = sagaMiddleware.run;
            store.endSaga = () => store.dispatch(END);
        } else {
            sagaMiddleware.run(rootSaga);
        }

        ProviderService._setupHotReloading(store);

        return store;
    }

    private static _setupHotReloading(store: ISagaStore<IStore>) {
        if (module.hot) {
            module.hot.accept('../stores/rootReducer', () => {
                const nextReducer = require('../stores/rootReducer').default; // eslint-disable-line global-require

                store.replaceReducer(nextReducer);
            });
        }
    }

}

export default ProviderService;
