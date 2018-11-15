import {RouterState} from 'connected-react-router';
import {Store} from 'redux';
import {FormReducer} from 'redux-form';
import ILoadingReducerState from './loading/ILoadingReducerState';
import IMetaReducerState from './meta/IMetaReducerState';
import IUserReducerState from './user/IUserReducerState';
import IRenderReducerState from './render/IRenderReducerState';
import IModalReducerState from './modal/IModalReducerState';

interface IStore extends Store<IStore> {
    readonly form: FormReducer;
    readonly loadingReducer: ILoadingReducerState;
    readonly metaReducer: IMetaReducerState;
    readonly modalReducer: IModalReducerState;
    readonly renderReducer: IRenderReducerState;
    readonly userReducer: IUserReducerState;
    readonly router: RouterState;
}

export default IStore;
