import {applyMiddleware, createStore, Middleware} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import {History} from 'history';
import rootReducer from '../stores/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction';
import createSagaMiddleware, {END, SagaMiddleware} from 'redux-saga';
import rootSaga from '../stores/rootSaga';
import IStore from '../stores/IStore';
import ISagaStore from '../stores/ISagaStore';
import reduxFreeze from 'redux-freeze';

const isProduction: boolean = process.env.NODE_ENV === 'production';

export default class ProviderUtility {

    public static createProviderStore(initialState: Partial<IStore> = {}, history: History = null, isServerSide: boolean = false): ISagaStore {
        const sagaMiddleware: SagaMiddleware<any> = createSagaMiddleware();

        const middleware: Middleware[] = [
            (isProduction || isServerSide) ? null : reduxFreeze,
            routerMiddleware(history),
            sagaMiddleware,
        ].filter(Boolean);

        const store: any = createStore(
            rootReducer(history),
            initialState,
            composeWithDevTools(
                applyMiddleware(...middleware),
            ),
        );

        if (isServerSide) {
            store.runSaga = sagaMiddleware.run;
            store.endSaga = () => store.dispatch(END);
        } else {
            sagaMiddleware.run(rootSaga);
        }

        return store;
    }

}
