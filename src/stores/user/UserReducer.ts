import UserAction from './UserAction';
import IUserReducerState from './IUserReducerState';
import IAction from '../IAction';
import IUser from './models/IUser';

export default class UserReducer {

    private static readonly _initialState: IUserReducerState = {
        currentUser: null,
        isLoadingUser: false,
    };

    public static reducer(state: IUserReducerState = UserReducer._initialState, action: IAction<any>): IUserReducerState {
        switch (action.type) {
            case UserAction.LOAD_USER:
                return UserReducer._loadUser(state, action);
            case UserAction.LOAD_USER_SUCCESS:
                return UserReducer._loadUserSuccess(state, action);
            default:
                return state;
        }
    }

    private static _loadUser(state: IUserReducerState, action: IAction<IUser>): IUserReducerState {
        return {
            ...state,
            isLoadingUser: true,
        };
    }

    private static _loadUserSuccess(state: IUserReducerState, action: IAction<IUser>): IUserReducerState {
        return {
            ...state,
            currentUser: action.payload,
            isLoadingUser: false,
        };
    }

}
