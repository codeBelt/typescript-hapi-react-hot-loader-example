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
    loadingReducer: LoadingReducer.reducer as any,
    metaReducer: MetaReducer.reducer as any,
    modalReducer: ModalReducer.reducer as any,
    renderReducer: RenderReducer.reducer as any,
    router: routerReducer,
    userReducer: UserReducer.reducer as any,
};

export default combineReducers<IStore>(reducers as any) as Reducer<IStore>;
