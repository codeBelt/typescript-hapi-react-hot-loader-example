import ModalAction from './ModalAction';
import IModalReducerState from './IModalReducerState';
import IAction from '../IAction';

class ModalReducer {

    private static readonly _initialState: IModalReducerState = {
        currentModal: null,
        modalList: [],
    };

    public static reducer(state: IModalReducerState = ModalReducer._initialState, action: IAction<any>): IModalReducerState {
        switch (action.type) {
            case ModalAction.ADD_MODAL:
                return ModalReducer._addModal(state, action);
            case ModalAction.REMOVE_MODAL:
                return ModalReducer._closeCurrentModal(state, action);
            default:
                return state;
        }
    }

    private static _addModal(state: IModalReducerState, action: IAction<JSX.Element>): IModalReducerState {
        return {
            ...state,
            currentModal: action.payload,
            modalList: [...state.modalList, action.payload],
        };
    }

    private static _closeCurrentModal(state: IModalReducerState, action: IAction<void>): IModalReducerState {
        const currentModal: JSX.Element = state.currentModal;
        const modalIndex: number = state.modalList.indexOf(currentModal);
        const modals: JSX.Element[] = [
            ...state.modalList.slice(0, modalIndex),
            ...state.modalList.slice(modalIndex + 1),
        ];
        const previousModal: JSX.Element = modals[modals.length - 1];

        return {
            ...state,
            currentModal: previousModal || null,
            modalList: modals,
        };
    }

}

export default ModalReducer;
