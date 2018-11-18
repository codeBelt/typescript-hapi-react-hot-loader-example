import IAction from '../IAction';
import UserService from './UserService';
import UserAction from './UserAction';
import {put} from 'redux-saga/effects';
import UserModel from './models/UserModel';

export default class UserSaga {

    public static* loadUser(action: IAction<void> = null) {
        const userModel: UserModel = yield UserService.loadUser();

        yield put(UserAction.loadUserSuccess(userModel));
    }

}
