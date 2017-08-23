import {Store} from 'redux';

interface ISagaStore<S> extends Store<S> {
    runSaga: Function; // TODO: figure out type
    endSaga: Function; // TODO: figure out type
}

export default ISagaStore;
