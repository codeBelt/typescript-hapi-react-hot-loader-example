import ModalAction, {ActionUnion} from './ModalAction';
import IModalReducerState from './IModalReducerState';
import IAction from '../IAction';

export default class ModalReducer {

    private static readonly _initialState: IModalReducerState = {
        currentModal: null,
        modals: [],
    };

    public static reducer(state: IModalReducerState = ModalReducer._initialState, action: IAction<ActionUnion>): IModalReducerState {
        switch (action.type) {
            case ModalAction.ADD_MODAL:
                const modal: JSX.Element = action.payload as JSX.Element;

                return {
                    ...state,
                    currentModal: modal,
                    modals: [...state.modals, modal],
                };
            case ModalAction.REMOVE_MODAL:
                const currentModal: JSX.Element = state.currentModal;
                const modalIndex: number = state.modals.indexOf(currentModal);
                const modals = [
                    ...state.modals.slice(0, modalIndex),
                    ...state.modals.slice(modalIndex + 1),
                ];
                const previousModal: JSX.Element = modals[modals.length - 1];

                return {
                    ...state,
                    currentModal: previousModal || null,
                    modals,
                };
            default:
                return state;
        }
    }

}
