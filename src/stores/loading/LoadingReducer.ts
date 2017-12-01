import LoadingAction from './LoadingAction';
import ILoadingReducerState from './ILoadingReducerState';
import IAction from '../IAction';

class LoadingReducer {

    private static readonly _initialState: ILoadingReducerState = {
        isLoading: false,
    };

    public static reducer(state: ILoadingReducerState = LoadingReducer._initialState, action: IAction<any>): ILoadingReducerState {
        switch (action.type) {
            case LoadingAction.SET_LOADING:
                return LoadingReducer._setLoading(state, action);
            default:
                return state;
        }
    }

    private static _setLoading(state: ILoadingReducerState, action: IAction<boolean>): ILoadingReducerState {
        return {
            ...state,
            isLoading: action.payload,
        };
    }

}

export default LoadingReducer;
