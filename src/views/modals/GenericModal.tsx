import * as React from 'react';
import BaseModal from './BaseModal';
import {connect} from 'react-redux';
import IAction from '../../stores/IAction';
import IStore from '../../stores/IStore';
import {Dispatch} from 'redux';
import ModalAction from '../../stores/modal/ModalAction';

export interface IProps<T> {
    isRequired?: boolean;
    message: string;
    rejectLabel?: string;
    acceptLabel?: string;
    modalData?: T;
    onAccept?: (props: IProps<T>) => void;
    onReject?: (props: IProps<T>) => void;
}
interface IState {}
interface IStateToProps {}
interface IDispatchToProps {
    dispatch: (action: IAction<any>) => void;
}

const mapStateToProps = (state: IStore) => ({});
const mapDispatchToProps = (dispatch: Dispatch<IAction<any>>): IDispatchToProps => ({
    dispatch,
});

type PropsUnion = IStateToProps & IDispatchToProps & IProps<any>;

class GenericModal extends React.Component<PropsUnion, IState> {

    public static defaultProps: Partial<PropsUnion> = {
        modalData: null,
    };

    private _onRejectHandler: (event: React.MouseEvent<HTMLButtonElement>) => void = this._onReject.bind(this);
    private _onAcceptHandler: (event: React.MouseEvent<HTMLButtonElement>) => void = this._onAccept.bind(this);
    private _onClosetHandler: (event: React.MouseEvent<HTMLButtonElement>) => void = this._onClose.bind(this);

    public render(): JSX.Element {
        return (
            <BaseModal isRequired={this.props.isRequired}>
                <section className="modal-content">
                    <div className="modal-body">
                        {this.props.message}
                    </div>
                    <div className="modal-footer">
                        {this.props.rejectLabel && (
                            <button
                                onClick={this.props.onReject ? this._onRejectHandler : this._onClosetHandler}
                            >
                                {this.props.rejectLabel}
                            </button>
                        )}
                        {this.props.acceptLabel && (
                            <button
                                onClick={this.props.onAccept ? this._onAcceptHandler : this._onClosetHandler}
                            >
                                {this.props.acceptLabel}
                            </button>
                        )}
                    </div>
                </section>
            </BaseModal>
        );
    }

    private _onReject(): void {
        this.props.onReject(this.props);
    }

    private _onAccept(): void {
        this.props.onAccept(this.props);
    }

    private _onClose(): void {
        this.props.dispatch(ModalAction.closeModal());
    }

}

export default connect<IStateToProps, IDispatchToProps, IProps<any>>(mapStateToProps, mapDispatchToProps)(GenericModal);
