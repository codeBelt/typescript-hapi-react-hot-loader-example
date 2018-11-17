import IUser from './models/IUser';

export default interface IUserReducerState {
    readonly currentUser: IUser;
    readonly isLoadingUser: boolean;
}
