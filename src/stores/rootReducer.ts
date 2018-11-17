import {combineReducers, Reducer, ReducersMapObject} from 'redux';
import {connectRouter} from 'connected-react-router';
import UserReducer from './user/UserReducer';
import MetaReducer from './meta/MetaReducer';
import {reducer as formReducer} from 'redux-form';
import RenderReducer from './render/RenderReducer';
import IStore from './IStore';
import ModalReducer from './modal/ModalReducer';
import {History} from 'history';

export default (history: History): Reducer<IStore> => {
    const reducerMap: ReducersMapObject = {
        form: formReducer,
        metaReducer: MetaReducer.reducer,
        modalReducer: ModalReducer.reducer,
        renderReducer: RenderReducer.reducer,
        userReducer: UserReducer.reducer,
        router: connectRouter(history),
    };

    return combineReducers(reducerMap);
};
