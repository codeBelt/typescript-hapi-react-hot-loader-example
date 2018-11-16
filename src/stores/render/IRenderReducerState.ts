import {IServerLocation} from '../../server/utilities/ServerUtility';

export default interface IRenderReducerState {
    readonly isServerSide: boolean;
    readonly serverSideLocation: IServerLocation;
}
