import {Action} from 'redux';

/**
 * https://github.com/acdlite/flux-standard-action
 */
export default interface IAction<T> extends Action<string> {
    type: string;
    payload?: T;
    error?: boolean;
    meta?: any;
}
