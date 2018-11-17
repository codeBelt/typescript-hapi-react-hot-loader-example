import * as React from 'react';
import {form2js} from 'form2js';
import InputField from '../components/InputField';
import {connect} from 'react-redux';
import IAction from '../../stores/IAction';
import IStore from '../../stores/IStore';
import {Dispatch} from 'redux';
import ModalAction from '../../stores/modal/ModalAction';
import BaseModal from './BaseModal';

export interface IProps {
    isRequired: boolean;
    data: any;
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

class ExampleFormModal extends React.Component<PropsUnion, IState> {

    public static defaultProps: Partial<PropsUnion> = {
        isRequired: false,
    };

    private _formElement: HTMLFormElement = null;
    private _onClickAcceptHandler: (event: React.MouseEvent<HTMLButtonElement>) => void = this._onClickAccept.bind(this);
    private _onClickCloseHandler: (event: React.MouseEvent<HTMLButtonElement>) => void = this._onClickClose.bind(this);

    public render(): JSX.Element {
        return (
            <BaseModal isRequired={this.props.isRequired}>
                <section className="modal-content">
                    <h2 className="modal-header modal-header_left">{'Modal Form Title'}</h2>
                    <div className="modal-body">
                        {this._buildFormJsx()}
                    </div>
                    <div className="modal-footer modal-footer_stack">
                        <button onClick={this._onClickCloseHandler}>
                            {'Cancel'}
                        </button>
                        <button onClick={this._onClickAcceptHandler}>
                            {'Accept'}
                        </button>
                    </div>
                </section>
            </BaseModal>
        );
    }

    private _buildFormJsx(): JSX.Element {
        return (
            <form
                autoComplete="off"
                className="modalForm u-validate"
                noValidate={true}
                ref={(element: HTMLFormElement) => {
                    this._formElement = element;
                }}
            >
                <p className="modalForm-warning">
                    {'This is an example of a custom modal. The "isRequired" attribute is set to "true" which prevents the user from clicking the esc key or click outside of the modal to close it. It also has form validation.'}
                </p>
                <div className="modalForm-item">
                    <label
                        htmlFor="modal-form-name"
                        className="modalForm-item-label"
                    >
                        {'Name'}<sup>{'*'}</sup>
                    </label>
                    <div className="modalForm-item-input">
                        <InputField
                            id={'modal-form-name'}
                            name="name"
                            isRequired={true}
                        />
                    </div>
                </div>
                <div className="modalForm-item">
                    <label
                        htmlFor="modal-form-exposure-limit"
                        className="modalForm-item-label"
                    >
                        {'Age'}<sup>{'*'}</sup>
                    </label>
                    <div className="modalForm-item-input">
                        <InputField
                            id={'example-form-age'}
                            name="age"
                            step={'1'}
                            type={'number'}
                            isRequired={true}
                        />
                    </div>
                </div>
                <div className="modalForm-item">
                    <label
                        htmlFor="modal-form-molecular-weight"
                        className="modalForm-item-label"
                    >
                        {'Email'}<sup>{'*'}</sup>
                    </label>
                    <div className="modalForm-item-input">
                        <InputField
                            id={'example-form-modal-email'}
                            name="email"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                            isRequired={true}
                        />
                    </div>
                </div>
                <div className="modalForm-item">
                    <label
                        htmlFor="example-form-modal"
                        className="modalForm-item-label"
                    >
                        {'Address'}
                    </label>
                    <div className="modalForm-item-input">
                        <InputField
                            id={'example-form-modal-address'}
                            name="address"
                        />
                    </div>
                </div>
            </form>
        );
    }

    private _onClickAccept(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();

        if (this._formElement.checkValidity()) {
            const formData: any = form2js(this._formElement, '.', false);

            console.info(formData);

            this._onClickClose();
        } else {
            this._formElement.classList.remove('u-validate');
        }
    }

    private _onClickClose(event: React.MouseEvent<HTMLButtonElement> = null): void {
        this.props.dispatch(ModalAction.closeModal());
    }

}

export default connect<IStateToProps, IDispatchToProps, IProps>(mapStateToProps, mapDispatchToProps)(ExampleFormModal);
