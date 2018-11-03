import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import IAction from '../../stores/IAction';
import IStore from '../../stores/IStore';
import KeyboardKeyEnum from '../../constants/KeyboardKeyEnum';
import ModalAction from '../../stores/modal/ModalAction';

interface IProps {
    isRequired?: boolean;
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

class BaseModal extends React.Component<PropsUnion, IState> {

    public static defaultProps: Partial<PropsUnion> = {
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
            <div className="modal-open">
                <div
                    className="modal"
                    id="modal"
                    role="dialog"
                    tabIndex={-1}
                >
                    <div
                        className="modal-dialog"
                        role="document"
                    >
                        {this.props.children}
                    </div>
                </div>
                <div
                    className="modal-backdrop"
                    onClick={this._onClickOverlayHandler}
                />
            </div>
        );
    }

    private _onClickOverlay(event: React.MouseEvent<HTMLElement>): void {
        if (!this.props.isRequired) {
            this.props.dispatch(ModalAction.closeModal());
        }
    }

    private _onKeyDownModal(event: KeyboardEvent): void {
        if (event.key === KeyboardKeyEnum.ESCAPE) {
            event.preventDefault();

            this.props.dispatch(ModalAction.closeModal());
        }
    }

    // private _buildModalOverlayClassames(): string {
    //     return classNames({
    //         'modal-overlay': true,
    //         'modal-overlay_required': this.props.isRequired,
    //     });
    // }

}

export default connect<IStateToProps, IDispatchToProps, IProps>(mapStateToProps, mapDispatchToProps)(BaseModal);

