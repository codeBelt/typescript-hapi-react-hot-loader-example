import {FormStateMap} from 'redux-form';
import {RouteComponentProps} from 'react-router';
import ILoadingReducerState from './loading/ILoadingReducerState';
import IMetaReducerState from './meta/IMetaReducerState';
import IUserReducerState from './user/IUserReducerState';
import IRenderReducerState from './render/IRenderReducerState';

interface IStore extends RouteComponentProps<any> {
    readonly form: FormStateMap;
    readonly loadingReducer: ILoadingReducerState;
    readonly metaReducer: IMetaReducerState;
    readonly renderReducer: IRenderReducerState;
    readonly userReducer: IUserReducerState;
}

export default IStore;
