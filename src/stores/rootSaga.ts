import {all, fork, takeLatest, select, ForkEffect} from 'redux-saga/effects';
import UserSaga from './user/UserSaga';
import UserAction from './user/UserAction';
import IStore from './IStore';

export default function* rootSaga() {
    const store: IStore = yield select();
    const isServerSide = store.renderReducer.isServerSide;

    const filteredSagas: ForkEffect[] = [
        isServerSide ? fork(UserSaga.loadUser) : null,
        takeLatest(UserAction.LOAD_USER, UserSaga.loadUser),
    ].filter(Boolean);

    yield all(filteredSagas);
}
