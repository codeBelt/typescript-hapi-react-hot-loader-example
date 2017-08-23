import {FormStateMap} from 'redux-form';
import {RouteComponentProps} from 'react-router';
import ILoadingReducerState from './reducers/ILoadingReducerState';
import IMetaReducerState from './reducers/IMetaReducerState';
import IUserReducerState from './reducers/IUserReducerState';
import IRenderReducerState from './reducers/IRenderReducerState';

interface IStore extends RouteComponentProps<any> {
    readonly form: FormStateMap;
    readonly loadingReducer: ILoadingReducerState;
    readonly metaReducer: IMetaReducerState;
    readonly renderReducer: IRenderReducerState;
    readonly userReducer: IUserReducerState;
}

export default IStore;
