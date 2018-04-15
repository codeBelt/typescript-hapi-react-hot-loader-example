import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import {History} from 'history';
import rootReducer from '../stores/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware, {END, SagaMiddleware} from 'redux-saga';
import rootSaga from '../stores/rootSaga';
import IStore from '../stores/IStore';
import ISagaStore from '../stores/ISagaStore';

class ProviderUtility {

    public static createProviderStore(initialState: any = {}, history: History = null, isServerSide: boolean = false): ISagaStore<IStore> {
        const sagaMiddleware: SagaMiddleware<any> = createSagaMiddleware();

        const store = createStore(
            rootReducer,
            initialState,
            composeWithDevTools(applyMiddleware(
                sagaMiddleware,
                routerMiddleware(history),
            )),
        ) as ISagaStore<IStore>;

        if (isServerSide) {
            store.runSaga = sagaMiddleware.run;
            store.endSaga = () => store.dispatch(END);
        } else {
            sagaMiddleware.run(rootSaga);
        }

        ProviderUtility._setupHotReloading(store);

        return store;
    }

    private static _setupHotReloading(store: ISagaStore<IStore>): void {
        if (module.hot) {
            module.hot.accept('../stores/rootReducer', () => {
                const nextReducer = require('../stores/rootReducer').default; // tslint:disable-line:no-require-imports

                store.replaceReducer(nextReducer);
            });
        }
    }

}

export default ProviderUtility;
