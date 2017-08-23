import IAction from '../../interfaces/store/IAction';

class UserAction {

    public static readonly LOAD_USER = 'UserAction.LOAD_USER';
    public static readonly LOAD_USER_SUCCESS = 'UserAction.LOAD_USER_SUCCESS';
    public static readonly LOAD_USER_FAIL = 'UserAction.LOAD_USER_FAIL';

    public static loadUser(): IAction<void> {
        return {
            type: UserAction.LOAD_USER,
        };
    }

}

export default UserAction;
