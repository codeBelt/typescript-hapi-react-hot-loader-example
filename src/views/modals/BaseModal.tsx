import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import IAction from '../../stores/IAction';
import IStore from '../../stores/IStore';
import ModalAction from '../../stores/modal/ModalAction';
import KeyboardKeyEnum from '../../constants/KeyboardKeyEnum';

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

    public componentDidMount(): void {
        if (!this.props.isRequired) {
            global.window.addEventListener('keydown', this._onKeyDownModal);
        }
    }

    public componentWillUnmount(): void {
        if (!this.props.isRequired) {
            global.window.removeEventListener('keydown', this._onKeyDownModal);
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
                    onClick={this._onClickOverlay}
                />
                {this.props.children}
            </div>
        );
    }

    private _onClickOverlay = (event: React.MouseEvent<HTMLElement>): void => {
        if (!this.props.isRequired) {
            this.props.dispatch(ModalAction.closeModal());
        }
    }

    private _onKeyDownModal = (event: KeyboardEvent): void => {
        if (event.key === KeyboardKeyEnum.ESCAPE) {
            event.preventDefault();

            this.props.dispatch(ModalAction.closeModal());
        }
    }

}

export default connect<IStateToProps, IDispatchToProps, IProps>(mapStateToProps, mapDispatchToProps)(BaseModal);
