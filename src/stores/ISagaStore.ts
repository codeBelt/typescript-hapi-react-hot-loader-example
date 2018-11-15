import IStore from './IStore';

interface ISagaStore extends IStore {
    runSaga: any; // TODO: figure out type
    endSaga: any; // TODO: figure out type
}

export default ISagaStore;
