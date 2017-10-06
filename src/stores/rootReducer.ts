import {combineReducers, Reducer} from 'redux';
import UserReducer from './user/UserReducer';
import LoadingReducer from './loading/LoadingReducer';
import MetaReducer from './meta/MetaReducer';
import {reducer as formReducer} from 'redux-form';
import RenderReducer from './render/RenderReducer';
import IStore from './IStore';

const reducers: IStore = {
    form: formReducer,
    loadingReducer: LoadingReducer.reduce as any,
    metaReducer: MetaReducer.reduce as any,
    renderReducer: RenderReducer.reduce as any,
    userReducer: UserReducer.reduce as any,
};

export default combineReducers<IStore>(reducers as any) as Reducer<IStore>;
