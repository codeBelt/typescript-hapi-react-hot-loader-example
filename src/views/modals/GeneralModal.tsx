import * as React from 'react';
import withBaseModal, {TProps as BaseModelProps} from './withBaseModal';

interface IProps extends BaseModelProps {
    modalData: {
        message: string;
        rejectLabel?: string;
        acceptLabel?: string;
    };
}
interface IState {}

class GeneralModal extends React.Component<IProps, IState> {

    public render(): JSX.Element {
        return (
            <section className="modal-content modal-content_md">
                <div className="modal-body">
                    {this.props.modalData.message}
                </div>
                <div className="modal-footer modal-footer_block modal-footer_stack">
                    {this.props.modalData.rejectLabel && (
                        <button
                            onClick={this.props.onReject || this.props.closeModal}
                        >
                            {this.props.modalData.rejectLabel}
                        </button>
                    )}
                    {this.props.modalData.acceptLabel && (
                        <button
                            onClick={this.props.onAccept || this.props.closeModal}
                        >
                            {this.props.modalData.acceptLabel}
                        </button>
                    )}
                </div>
            </section>
        );
    }

}

export default withBaseModal(GeneralModal);
