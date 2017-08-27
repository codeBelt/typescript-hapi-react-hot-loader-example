import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../stores/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware, {END, SagaMiddleware} from 'redux-saga';
import rootSaga from '../stores/rootSaga';
import IStore from '../interfaces/store/IStore';
import ISagaStore from '../interfaces/store/ISagaStore';

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
            sagaMiddleware.run(rootSaga as any);
        }

        ProviderService._setupHotReloading(store);

        return store;
    }

    private static _setupHotReloading(store: ISagaStore<IStore>) {
        if ((module as any).hot) {
            (module as any).hot.accept('../store/rootReducer', () => {
                const nextReducer = require('../store/rootReducer').default; // eslint-disable-line global-require

                store.replaceReducer(nextReducer);
            });
        }
    }

}

export default ProviderService;
