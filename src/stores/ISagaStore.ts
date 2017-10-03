import {Store} from 'redux';

interface ISagaStore<S> extends Store<S> {
    runSaga: any; // TODO: figure out type
    endSaga: any; // TODO: figure out type
}

export default ISagaStore;
