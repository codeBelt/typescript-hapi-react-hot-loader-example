interface IAction<T> {
    type: symbol;
    payload?: T;
    error?: boolean;
    meta?: any;
}

export default IAction;
