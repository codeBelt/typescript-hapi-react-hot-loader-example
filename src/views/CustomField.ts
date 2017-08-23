import {Field} from 'redux-form';

const CustomField = Field as new () => Field<{
    label?: string;
    placeholder?: string;
    type?: string;
    option?: string;
    checked?: boolean;
    disabled?: boolean;
}>;

export default CustomField;
