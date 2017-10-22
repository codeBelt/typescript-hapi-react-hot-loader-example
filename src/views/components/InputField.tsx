import * as React from 'react';
import * as classNames from 'classnames';

interface IProps {
    hideLabel?: boolean;
    name?: string;
    id: string;
    isInline?: boolean;
    label?: string;
    size?: number;
    defaultValue?: string;
    type?: string;
    isRequired?: boolean;
    step?: string;
    pattern?: string;
    onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface IState {}

class InputField extends React.Component<IProps, IState> {

    public static defaultProps: Partial<IProps> = {
        type: 'text',
    };

    public render(): JSX.Element {
        return (
            <div className={this._buildClassNames()}>
                {this.props.label &&
                    <label
                        className="inputField-label"
                        htmlFor={this.props.id}
                    >
                        {this.props.label}
                    </label>
                }
                <input
                    className="inputField-input"
                    id={this.props.id}
                    name={this.props.name}
                    type={this.props.type}
                    size={this.props.size}
                    defaultValue={this.props.defaultValue}
                    onChange={this.props.onChangeHandler}
                    required={this.props.isRequired}
                    step={this.props.step}
                    pattern={this.props.pattern}
                />
            </div>
        );
    }

    private _buildClassNames(): string {
        return classNames({
            inputField: true,
            inputField_inline: this.props.isInline,
            inputField_noLabel: this.props.hideLabel,
        });
    }

}

export default InputField;
