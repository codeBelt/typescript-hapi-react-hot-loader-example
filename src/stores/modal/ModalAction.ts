import IAction from '../IAction';

class ModalAction {

    public static readonly ADD_MODAL: string = 'ModalAction.ADD_MODAL';
    public static readonly REMOVE_MODAL: string = 'ModalAction.REMOVE_MODAL';

    public static addModal(modal: JSX.Element): IAction<JSX.Element> {
        return {
            type: ModalAction.ADD_MODAL,
            payload: modal,
        };
    }

    public static closeModal(): IAction<void> {
        return {
            type: ModalAction.REMOVE_MODAL,
        };
    }

}

export default ModalAction;
