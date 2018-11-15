import {IServerLocation} from '../../server/utilities/ServerUtility';

interface IRenderReducerState {
    readonly isServerSide: boolean;
    readonly serverSideLocation: IServerLocation;
}

export default IRenderReducerState;
