import MetaAction from './MetaAction';
import IMetaReducerState from './IMetaReducerState';
import IAction from '../IAction';
import ITitleDescription from './models/ITitleDescription';

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

    private static _setMeta(state: IMetaReducerState, action: IAction<ITitleDescription>): IMetaReducerState {
        return {
            ...state,
            description: action.payload.description || '',
            title: action.payload.title,
        };
    }

}

export default MetaReducer;
