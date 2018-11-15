import IRenderReducerState from './IRenderReducerState';
import IAction from '../IAction';

export default class RenderReducer {

    private static readonly _initialState: IRenderReducerState = {
        isServerSide: true,
        serverSideLocation: null,
    };

    public static reducer(state: IRenderReducerState = RenderReducer._initialState, action: IAction<IRenderReducerState>): IRenderReducerState {
        return state;
    }

}
