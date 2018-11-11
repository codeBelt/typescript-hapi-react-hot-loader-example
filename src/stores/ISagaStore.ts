import IStore from './IStore';

export default interface ISagaStore extends IStore {
    runSaga: any; // TODO: figure out type
    endSaga: any; // TODO: figure out type
}
