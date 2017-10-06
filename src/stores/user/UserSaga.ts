import {put} from 'redux-saga/effects';
import UserAction from './UserAction';
import LoadingAction from '../loading/LoadingAction';
import IAction from '../IAction';
import IUserReducerState from './IUserReducerState';

class UserSaga {

    public static* loadUser(action: IAction<void> = null) {
        yield put({
            type: LoadingAction.SET_LOADING,
            payload: true,
        });

        const response: Response = yield fetch('https://randomuser.me/api/?inc=picture,name,email,phone,id,dob');
        const type: string = (response.status === 200) ? UserAction.LOAD_USER_SUCCESS : UserAction.LOAD_USER_FAIL;

        let data: IUserReducerState = null;

        if (response.status === 200) {
            const json = yield response.json();

            data = json.results[0];
        }

        yield put({
            type,
            payload: data,
            meta: response,
            error: response.statusText,
        });

        yield put({
            type: LoadingAction.SET_LOADING,
            payload: false,
        });
    }

}

export default UserSaga;
