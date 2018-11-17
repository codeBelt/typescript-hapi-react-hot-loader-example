import {RouterState} from 'connected-react-router';
import {Store} from 'redux';
import {FormReducer} from 'redux-form';
import IMetaReducerState from './meta/IMetaReducerState';
import IUserReducerState from './user/IUserReducerState';
import IRenderReducerState from './render/IRenderReducerState';
import IModalReducerState from './modal/IModalReducerState';

export default interface IStore extends Store<IStore> {
    readonly form: FormReducer;
    readonly metaReducer: IMetaReducerState;
    readonly modalReducer: IModalReducerState;
    readonly renderReducer: IRenderReducerState;
    readonly userReducer: IUserReducerState;
    readonly router: RouterState;
}
