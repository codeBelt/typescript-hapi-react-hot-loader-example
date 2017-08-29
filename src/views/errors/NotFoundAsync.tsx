import {asyncComponent} from 'react-async-component';

const NotFoundAsync = asyncComponent({
    name: 'NotFoundAsync',
    serverMode: 'resolve',
    resolve: () => {
        return import(/* webpackChunkName: "NotFound" */ './NotFound');
    },
});

export default NotFoundAsync;
