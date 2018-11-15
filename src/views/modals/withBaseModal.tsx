import * as React from 'react';
import * as classNames from 'classnames';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import ModalAction from '../../stores/modal/ModalAction';
import IStore from '../../stores/IStore';
import KeyboardKeyEnum from '../../constants/KeyboardKeyEnum';
import IAction from '../../stores/IAction';

interface IState {}
interface IProps {
    isRequired?: boolean;
    modalData?: any;
    onAccept?: (...rest: any[]) => void;
    onReject?: (...rest: any[]) => void;
}
interface IStateToProps {}
interface IDispatchToProps {
    closeModal: () => void;
}
export type TProps = IStateToProps & IDispatchToProps & IProps;

const withBaseModal = (ModalContent: any) => {

    const mapStateToProps = (state: IStore) => ({});
    const mapDispatchToProps = (dispatch: Dispatch<IAction<any>>): IDispatchToProps => ({
        closeModal: () => dispatch(ModalAction.closeModal()),
    });

    class BaseModal extends React.Component<TProps, IState> {

        public static defaultProps: Partial<TProps> = {
            isRequired: false,
        };

        private _onKeyDownModalHandler: (event: KeyboardEvent) => void = this._onKeyDownModal.bind(this);
        private _onClickOverlayHandler: (event: React.MouseEvent<HTMLElement>) => void = this._onClickOverlay.bind(this);

        public componentDidMount(): void {
            if (!this.props.isRequired) {
                global.window.addEventListener('keydown', this._onKeyDownModalHandler);
            }
        }

        public componentWillUnmount(): void {
            if (!this.props.isRequired) {
                global.window.removeEventListener('keydown', this._onKeyDownModalHandler);
            }
        }

        public render(): JSX.Element {
            return (
                <div
                    className="modal"
                    role="alert"
                    aria-live="polite"
                >
                    <div
                        className={this._buildModalOverlayClassames()}
                        onClick={this._onClickOverlayHandler}
                    />
                    <ModalContent {...this.props} />
                </div>
            );
        }

        private _onClickOverlay(event: React.MouseEvent<HTMLElement>): void {
            if (!this.props.isRequired) {
                this.props.closeModal();
            }
        }

        private _onKeyDownModal(event: KeyboardEvent): void {
            if (event.key === KeyboardKeyEnum.ESCAPE) {
                event.preventDefault();

                this.props.closeModal();
            }
        }

        private _buildModalOverlayClassames(): string {
            return classNames({
                'modal-overlay': true,
                'modal-overlay_required': this.props.isRequired,
            });
        }

    }

    return connect<IStateToProps, IDispatchToProps, IProps>(mapStateToProps, mapDispatchToProps)(BaseModal);

};

export default withBaseModal;
