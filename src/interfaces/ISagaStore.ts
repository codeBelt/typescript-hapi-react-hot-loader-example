import {Store} from 'redux';

interface ISagaStore<S> extends Store<S> {
    runSaga: any; // TODO: flesh out types
    endSaga: any;
}

export default ISagaStore;
