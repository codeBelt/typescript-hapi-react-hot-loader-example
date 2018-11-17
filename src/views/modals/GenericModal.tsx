import * as React from 'react';
import BaseModal from './BaseModal';
import {connect} from 'react-redux';
import IAction from '../../stores/IAction';
import IStore from '../../stores/IStore';
import {Dispatch} from 'redux';
import ModalAction from '../../stores/modal/ModalAction';

export interface IProps {
    message: string;
    rejectLabel?: string;
    acceptLabel?: string;
    onReject?: (props: IProps) => void;
    onAccept?: (props: IProps) => void;
    isRequired?: boolean;
    data?: any;
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

type PropsUnion = IStateToProps & IDispatchToProps & IProps;

class GenericModal extends React.Component<PropsUnion, IState> {

    public static defaultProps: Partial<PropsUnion> = {
        message: '',
        isRequired: false,
    };

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
                                onClick={this.props.onReject ? this._onClickReject : this._onClickClose}
                            >
                                {this.props.rejectLabel}
                            </button>
                        )}
                        {this.props.acceptLabel && (
                            <button
                                onClick={this.props.onAccept ? this._onClickAccept : this._onClickClose}
                            >
                                {this.props.acceptLabel}
                            </button>
                        )}
                    </div>
                </section>
            </BaseModal>
        );
    }

    private _onClickReject = (): void => {
        this.props.onReject(this.props);
    }

    private _onClickAccept = (): void => {
        this.props.onAccept(this.props);
    }

    private _onClickClose = (): void => {
        this.props.dispatch(ModalAction.closeModal());
    }

}

export default connect<IStateToProps, IDispatchToProps, IProps>(mapStateToProps, mapDispatchToProps)(GenericModal);
