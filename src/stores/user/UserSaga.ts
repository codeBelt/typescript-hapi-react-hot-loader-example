import IAction from '../IAction';
import UserService from './UserService';
import UserAction from './UserAction';
import {put} from 'redux-saga/effects';
import IUser from './models/IUser';

export default class UserSaga {

    public static* loadUser(action: IAction<void> = null) {
        const responseModel: IUser = yield UserService.loadUser();

        yield put(UserAction.loadUserSuccess(responseModel));
    }

}
