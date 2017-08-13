import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../store/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware, {END} from 'redux-saga';
import rootSaga from '../store/rootSaga';
import IStore from '../interfaces/IStore';
import ISagaStore from '../interfaces/ISagaStore';

class ProviderService {

    static createProviderStore(initialState: any = {}, isServerSide: boolean = false): ISagaStore<IStore> {
        const sagaMiddleware = createSagaMiddleware();

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
            module.hot.accept('../store/rootReducer', () => {
                const nextReducer = require('../store/rootReducer').default;

                store.replaceReducer(nextReducer);
            });
        }
    }

}

export default ProviderService;
