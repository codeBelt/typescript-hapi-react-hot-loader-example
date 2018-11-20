import {RouterState} from 'connected-react-router';
import {Store} from 'redux';
import {FormReducer} from 'redux-form';
import IUserReducerState from './user/IUserReducerState';
import IRenderReducerState from './render/IRenderReducerState';
import IModalReducerState from './modal/IModalReducerState';

export default interface IStore extends Store<IStore> {
    readonly form: FormReducer;
    readonly modalReducer: IModalReducerState;
    readonly renderReducer: IRenderReducerState;
    readonly userReducer: IUserReducerState;
    readonly router: RouterState;
}
