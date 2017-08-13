interface IAction<T> {
    type: string;
    payload?: T;
    error?: boolean;
    meta?: any;
}

export default IAction;
