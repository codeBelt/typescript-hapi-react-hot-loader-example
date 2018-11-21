import UserAction, {UserActionUnion} from './UserAction';
import IUserReducerState from './IUserReducerState';
import IAction from '../IAction';
import UserModel from './models/UserModel';

export default class UserReducer {

    private static readonly _initialState: IUserReducerState = {
        currentUser: null,
        isLoadingUser: false,
    };

    public static reducer(state: IUserReducerState = UserReducer._initialState, action: IAction<UserActionUnion>): IUserReducerState {
        switch (action.type) {
            case UserAction.LOAD_USER:
                return {
                    ...state,
                    isLoadingUser: true,
                };
            case UserAction.LOAD_USER_SUCCESS:
                return {
                    ...state,
                    isLoadingUser: false,
                    currentUser: action.payload as UserModel,
                };
            default:
                return state;
        }
    }

}
