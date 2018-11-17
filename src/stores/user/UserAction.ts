import IAction from '../IAction';
import IUser from './models/IUser';

export default class UserAction {

    public static readonly LOAD_USER: string = 'UserAction.LOAD_USER';
    public static readonly LOAD_USER_SUCCESS: string = 'UserAction.LOAD_USER_SUCCESS';

    public static loadUser(): IAction<void> {
        return {
            type: UserAction.LOAD_USER,
        };
    }

    public static loadUserSuccess(model: IUser): IAction<IUser> {
        return {
            payload: model,
            type: UserAction.LOAD_USER_SUCCESS,
        };
    }

}
