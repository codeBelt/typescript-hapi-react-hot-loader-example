import * as React from 'react';
import {connect} from 'react-redux';
import MetaAction from '../store/meta/MetaAction';
import {reduxForm, Field, FormProps, FormErrors} from 'redux-form';
import IStore from '../interfaces/IStore';
import {Dispatch} from 'redux';
import IContactForm from '../interfaces/IContactForm';
import IMetaReducerState from '../interfaces/reducers/IMetaReducerState';

const mapStateToProps = (state: IStore) => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setMeta: (meta: IMetaReducerState) => dispatch(MetaAction.setMeta(meta)),
});

interface IContactProps extends FormProps {
}

class Contact extends React.Component {

    private _handleSubmitHandler: Function = (formData: IContactForm) => this._onFormSubmit(formData);

    componentWillMount(): void {
        this.props.setMeta({title: 'Contact Page'});
    }

    public render(): JSX.Element {
        const {handleSubmit, reset} = this.props;

        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">{'Contact'}</h1>
                    <p className="lead">{'This contact form uses redux-form to do client-side validation.'}</p>
                </div>
                <form onSubmit={handleSubmit(this._handleSubmitHandler)}>
                    <div className="form-group">
                        <Field
                            component={this._renderInputField}
                            label="Name"
                            name="name"
                            placeholder=""
                            type="text"
                        />
                    </div>
                    <div className="form-group">
                        <Field
                            component={this._renderInputField}
                            label="Email"
                            name="email"
                            placeholder="example@example.com"
                            type="email"
                        />
                        <small
                            className="form-text text-muted"
                            id="emailHelp"
                        >
                            {'We\'ll never share your email with anyone else.'}
                        </small>
                    </div>
                    <div className="form-group">
                        <Field
                            label={'Example select'}
                            name="exampleSelect1"
                            component={this._renderSelect}
                        />
                    </div>
                    <div className="form-group">
                        <Field
                            component={this._renderTextArea}
                            label="Message"
                            name="message"
                            placeholder=""
                        />
                    </div>
                    <fieldset className="form-group">
                        <legend>{'Code Quality'}</legend>

                        <Field
                            component={this._renderRadio}
                            label="This code is awesome!"
                            name="codeQualityRadio"
                            option="1"
                            checked={true}
                        />
                        <Field
                            component={this._renderRadio}
                            label="This code is ok."
                            name="codeQualityRadio"
                            option="2"
                        />
                        <Field
                            component={this._renderRadio}
                            label="This code is bad."
                            name="codeQualityRadio"
                            option="3"
                            disabled={true}
                        />
                    </fieldset>
                    <div className="form-check">
                        <Field
                            component={this._renderCheckbox}
                            label="Did you star my repo?"
                            name="starred"
                            type="checkbox"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        {'Submit'}
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={reset}
                    >
                        {'Reset'}
                    </button>
                </form>
            </div>
        );
    }

    private _onFormSubmit(formData: IContactForm): void {
        console.info(formData);

        window.alert(JSON.stringify(formData, null, 2));
    }

    private _renderInputField(field: any): JSX.Element {
        const {meta: {touched, error}} = field;
        const className = `small text-danger ${touched && error ? '' : 'd-none'}`;

        return (
            <div>
                <label htmlFor={field.input.name}>
                    {field.label} <span className={className}>{error}</span>
                </label>
                <input
                    {...field.input}
                    className="form-control"
                    id={field.input.name}
                    placeholder={field.placeholder}
                    type={field.type}
                />
            </div>
        );
    }

    private _renderCheckbox(field: any): JSX.Element {
        return (
            <label
                className="form-check-label"
                htmlFor={field.input.name}
            >
                <input
                    {...field.input}
                    className="form-check-input"
                    type="checkbox"
                />
                {field.label}
            </label>
        );
    }

    private _renderRadio(field: any): JSX.Element {
        return (
            <div className="form-check">
                <label htmlFor={field.input.name} className="form-check-label">
                    <input
                        {...field.input}
                        checked={field.checked}
                        className="form-check-input"
                        disabled={field.disabled}
                        id={field.input.name}
                        name={field.input.name}
                        type="radio"
                        value={field.option}
                    />
                    {field.label}
                </label>
            </div>
        );
    }

    private _renderTextArea(field: any): JSX.Element {
        const {meta: {touched, error}} = field;
        const className = `small text-danger ${touched && error ? '' : 'd-none'}`;

        return (
            <div>
                <label htmlFor={field.input.name}>
                    {field.label} <span className={className}>{error}</span>
                </label>
                <textarea
                    {...field.input}
                    className="form-control"
                    placeholder={field.placeholder}
                    rows="3"
                />
            </div>
        );
    }

    /* eslint-disable jsx-a11y/label-has-for */
    private _renderSelect(field: any): JSX.Element {
        return (
            <div>
                <label htmlFor={field.name}>
                    {field.label}
                </label>
                <select
                    {...field.input}
                    id={field.name}
                    className="form-control"
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>
        );
    }

}

export default reduxForm({
    form: 'contactForm',
    validate: (formData: Readonly<IContactForm>) => {
        const errors: FormErrors<IContactForm> = {};
        const validEmailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!validEmailRegex.test(formData.email)) {
            errors.email = 'Invalid email address';
        }

        if (!formData.name) {
            errors.name = 'Required';
        }

        if (!formData.message) {
            errors.message = 'Required';
        }

        return errors;
    },
})(connect(mapStateToProps, mapDispatchToProps)(Contact));
