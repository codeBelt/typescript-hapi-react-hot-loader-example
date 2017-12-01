import IRenderReducerState from './IRenderReducerState';
import IAction from '../IAction';

class RenderReducer {

    private static readonly _initialState: IRenderReducerState = {
        isServerSide: true,
    };

    public static reducer(state: IRenderReducerState = RenderReducer._initialState, action: IAction<IRenderReducerState>): IRenderReducerState {
        return state;
    }

}

export default RenderReducer;
