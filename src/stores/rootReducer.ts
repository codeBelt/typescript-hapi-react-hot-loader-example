import {combineReducers, Reducer} from 'redux';
import {routerReducer} from 'react-router-redux';
import UserReducer from './user/UserReducer';
import LoadingReducer from './loading/LoadingReducer';
import MetaReducer from './meta/MetaReducer';
import {reducer as formReducer} from 'redux-form';
import RenderReducer from './render/RenderReducer';
import IStore from './IStore';
import ModalReducer from './modal/ModalReducer';

const reducers: IStore = {
    form: formReducer,
    loadingReducer: LoadingReducer.reduce as any,
    metaReducer: MetaReducer.reduce as any,
    modalReducer: ModalReducer.reduce as any,
    renderReducer: RenderReducer.reduce as any,
    router: routerReducer,
    userReducer: UserReducer.reduce as any,
};

export default combineReducers<IStore>(reducers as any) as Reducer<IStore>;
