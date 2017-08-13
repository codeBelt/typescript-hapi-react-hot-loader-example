import IRenderReducerState from '../../interfaces/reducers/IRenderReducerState';
import IAction from '../../interfaces/IAction';

class RenderReducer {

    private static readonly _initialState: IRenderReducerState = {
        isServerSide: true,
    };

    public static reduce(state: IRenderReducerState = RenderReducer._initialState, action: IAction<IRenderReducerState>): IRenderReducerState {
        return state;
    }

}

export default RenderReducer;
