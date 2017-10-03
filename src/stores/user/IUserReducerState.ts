interface IUserReducerState {
    readonly name: {
        title: string;
        first: string;
        last: string;
    };
    readonly email: string;
    readonly dob: string;
    readonly phone: string;
    readonly id: {
        name: string;
        value: string;
    };
    readonly picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
}

export default IUserReducerState;
