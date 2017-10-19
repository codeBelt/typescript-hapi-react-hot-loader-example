import * as React from 'react';
import {form2js} from 'form2js';
import withBaseModal, {TProps as BaseModelProps} from './withBaseModal';
import InputField from '../components/InputField';

interface IProps extends BaseModelProps {
    modalData: {};
}
interface IState {}

class ExampleFormModal extends React.Component<IProps, IState> {

    private _formElement: HTMLFormElement = null;
    private _onClickAcceptHandler: (event: React.MouseEvent<HTMLButtonElement>) => void = this._onClickAccept.bind(this);

    public render(): JSX.Element {
        return (
            <section className="modal-content">
                <h2 className="modal-header modal-header_left">{'language.customOrganicVaporTitle'}</h2>
                <div className="modal-body">
                    {this._buildVaporFormJsx()}
                </div>
                <div className="modal-footer modal-footer_stack">
                    <button onClick={this.props.closeModal}>
                        {'Cancel'}
                    </button>
                    <button onClick={this._onClickAcceptHandler}>
                        {'Accept'}
                    </button>
                </div>
            </section>
        );
    }

    private _buildVaporFormJsx(): JSX.Element {
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
                    {'language.customOrganicVaporWarning'}
                </p>
                <div className="modalForm-item">
                    <label
                        htmlFor="vapor-modal-form-name"
                        className="modalForm-item-label"
                    >
                        {'language.customOrganicVaporName'}<sup>{'*'}</sup>
                    </label>
                    <div className="modalForm-item-input">
                        <InputField
                            id={'vapor-modal-form-name'}
                            name="primaryName"
                            isRequired={true}
                        />
                    </div>
                </div>
                <div className="modalForm-item">
                    <label
                        htmlFor="vapor-modal-form-cas-number"
                        className="modalForm-item-label"
                    >
                        {'language.customOrganicVaporCasNumber'}
                    </label>
                    <div className="modalForm-item-input">
                        <InputField
                            id={'vapor-modal-form-cas-number'}
                            name="cas"
                        />
                    </div>
                </div>
                <div className="modalForm-item">
                    <label
                        htmlFor="vapor-modal-form-exposure-limit"
                        className="modalForm-item-label"
                    >
                        {'language.customOrganicVaporExposureLimit'}<sup>{'*'}</sup>
                    </label>
                    <div className="modalForm-item-input">
                        <InputField
                            id={'vapor-modal-form-exposure-limit'}
                            name="exposureLimit.value"
                            step={'0.1'}
                            type={'number'}
                            isRequired={true}
                        />
                    </div>
                </div>
                <div className="modalForm-item">
                    <label
                        htmlFor="vapor-modal-form-molecular-weight"
                        className="modalForm-item-label"
                    >
                        {'language.customOrganicVaporMolecularWeight'}<sup>{'*'}</sup>
                    </label>
                    <div className="modalForm-item-input">
                        <InputField
                            id={'vapor-modal-form-molecular-weight'}
                            name="molecularWeight"
                            step={'0.1'}
                            type={'number'}
                            isRequired={true}
                        />
                    </div>
                </div>
                <div className="modalForm-item">
                    <label
                        htmlFor="vapor-modal-form-index-of-refraction"
                        className="modalForm-item-label"
                    >
                        {'language.customOrganicVaporIndexOfRefraction'}<sup>{'*'}</sup>
                    </label>
                    <div className="modalForm-item-input">
                        <InputField
                            id={'vapor-modal-form-index-of-refraction'}
                            name="indexOfRefraction"
                            step={'0.1'}
                            type={'number'}
                            isRequired={true}
                        />
                    </div>
                </div>
                <div className="modalForm-item">
                    <label
                        htmlFor="vapor-modal-form-idlh"
                        className="modalForm-item-label"
                    >
                        {'language.customOrganicVaporIdhl'}
                    </label>
                    <div className="modalForm-item-input">
                        <InputField
                            id={'vapor-modal-form-idlh'}
                            name="idlh"
                        />
                    </div>
                </div>
                <div className="modalForm-item">
                    <label
                        htmlFor="vapor-modal-form-liquid-density"
                        className="modalForm-item-label"
                    >
                        {'language.customOrganicVaporLiquidDensity'}<sup>{'*'}</sup>
                    </label>
                    <div className="modalForm-item-input">
                        <InputField
                            id={'vapor-modal-form-liquid-density'}
                            name="liquidDensity"
                            step={'0.1'}
                            type={'number'}
                            isRequired={true}
                        />
                    </div>
                    <div className="modalForm-item-modifier">{'g/cm3'}</div>
                </div>
                <div className="modalForm-item">
                    <label
                        htmlFor="vapor-modal-form-saturated-vapor-pressure"
                        className="modalForm-item-label"
                    >
                        {'language.customOrganicVaporSaturatedVaporPressure'}
                    </label>
                    <div className="modalForm-item-input">
                        <InputField
                            id={'vapor-modal-form-saturated-vapor-pressure'}
                            name="saturatedVaporPressure"
                            step={'0.1'}
                            type={'number'}
                        />
                    </div>
                    <div className="modalForm-item-modifier">{'mm Hg'}</div>
                </div>
                <div className="modalForm-item">
                    <label
                        htmlFor="vapor-modal-form-exposure"
                        className="modalForm-item-label"
                    >
                        {'language.exposure'}
                    </label>
                    <div className="modalForm-item-input">
                        <InputField
                            id={'vapor-modal-form-exposure'}
                            name="exposure.value"
                            step={'0.1'}
                            type={'number'}
                        />
                    </div>
                </div>
            </form>
        );
    }

    private _onClickAccept(event: React.MouseEvent<HTMLButtonElement>): void {
        if (this._formElement.checkValidity()) {
            const formData: any = form2js(this._formElement, '.', false);

            console.log(formData);

            this.props.closeModal();
        } else {
            this._formElement.classList.remove('u-validate');
        }
    }

}

export default withBaseModal(ExampleFormModal);
