import UserModel from './models/UserModel';

export default interface IUserReducerState {
    readonly currentUser: UserModel;
    readonly isLoadingUser: boolean;
}
