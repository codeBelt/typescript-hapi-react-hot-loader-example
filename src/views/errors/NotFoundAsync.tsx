import * as React from 'react';
import {asyncComponent} from 'react-async-component';

const NotFoundAsync = asyncComponent({
    LoadingComponent: () => <div>Loading...</div>,
    name: 'NotFoundAsync',
    serverMode: 'resolve',
    resolve: () => {
        return import(/* webpackChunkName: "NotFound" */ './NotFound');
    },
});

export default NotFoundAsync;
