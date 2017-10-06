import IAction from '../IAction';

class UserAction {

    public static readonly LOAD_USER: symbol = Symbol('LOAD_USER');
    public static readonly LOAD_USER_SUCCESS: symbol = Symbol('LOAD_USER_SUCCESS');
    public static readonly LOAD_USER_FAIL: symbol = Symbol('LOAD_USER_FAIL');

    public static loadUser(): IAction<void> {
        return {
            type: UserAction.LOAD_USER,
        };
    }

}

export default UserAction;
