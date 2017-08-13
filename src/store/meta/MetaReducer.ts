import MetaAction from './MetaAction';
import IMetaReducerState from '../../interfaces/reducers/IMetaReducerState';
import IAction from '../../interfaces/IAction';

class MetaReducer {

    private static readonly _initialState: IMetaReducerState = {
        title: 'Robert is cool',
        description: '',
    };

    public static reduce(state: IMetaReducerState = MetaReducer._initialState, action: IAction<any>): IMetaReducerState {
        switch (action.type) {
            case MetaAction.SET_META:
                return MetaReducer._setMeta(state, action);
            default:
                return state;
        }
    }

    public static _setMeta(state: IMetaReducerState, action: IAction<IMetaReducerState>): IMetaReducerState {
        return {
            ...state,
            ...action.payload,
        };
    }

}

export default MetaReducer;
