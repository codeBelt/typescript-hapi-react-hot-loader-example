import {RouterState} from 'react-router-redux';
import {Reducer} from 'redux';
import {FormReducer} from 'redux-form';
import ILoadingReducerState from './loading/ILoadingReducerState';
import IMetaReducerState from './meta/IMetaReducerState';
import IUserReducerState from './user/IUserReducerState';
import IRenderReducerState from './render/IRenderReducerState';
import IModelReducerState from './modal/IModalReducerState';

interface IStore {
    readonly form: FormReducer;
    readonly loadingReducer: ILoadingReducerState;
    readonly metaReducer: IMetaReducerState;
    readonly modalReducer: IModelReducerState;
    readonly renderReducer: IRenderReducerState;
    readonly router: Reducer<RouterState>;
    readonly userReducer: IUserReducerState;
}

export default IStore;
