import MetaAction from './MetaAction';
import IMetaReducerState from './IMetaReducerState';
import IAction from '../IAction';

class MetaReducer {

    private static readonly _initialState: IMetaReducerState = {
        title: 'Robert is cool',
        description: '',
    };

    public static reducer(state: IMetaReducerState = MetaReducer._initialState, action: IAction<any>): IMetaReducerState {
        switch (action.type) {
            case MetaAction.SET_META:
                return MetaReducer._setMeta(state, action);
            default:
                return state;
        }
    }

    private static _setMeta(state: IMetaReducerState, action: IAction<IMetaReducerState>): IMetaReducerState {
        return {
            ...state,
            ...action.payload,
        };
    }

}

export default MetaReducer;
