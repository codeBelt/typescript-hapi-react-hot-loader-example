import IAction from '../IAction';

class UserAction {

    public static readonly LOAD_USER: string = 'UserAction.LOAD_USER';
    public static readonly LOAD_USER_SUCCESS: string = 'UserAction.LOAD_USER_SUCCESS';
    public static readonly LOAD_USER_FAIL: string = 'UserAction.LOAD_USER_FAIL';

    public static loadUser(): IAction<void> {
        return {
            type: UserAction.LOAD_USER,
        };
    }

}

export default UserAction;
