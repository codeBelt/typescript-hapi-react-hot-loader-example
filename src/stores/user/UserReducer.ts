import UserAction from './UserAction';
import IUserReducerState from './IUserReducerState';
import IAction from '../IAction';

class UserReducer {

    private static readonly _initialState: IUserReducerState = {
        name: {
            title: '',
            first: '',
            last: '',
        },
        email: '',
        dob: '',
        phone: '',
        id: {
            name: '',
            value: '',
        },
        picture: {
            large: '',
            medium: '',
            thumbnail: '',
        },
    };

    public static reducer(state: IUserReducerState = UserReducer._initialState, action: IAction<any>): IUserReducerState {
        switch (action.type) {
            case UserAction.LOAD_USER_SUCCESS:
                return UserReducer._loadUser(state, action);
            default:
                return state;
        }
    }

    private static _loadUser(state: IUserReducerState, action: IAction<IUserReducerState>): IUserReducerState {
        return {
            ...state,
            ...action.payload,
        };
    }

}

export default UserReducer;
