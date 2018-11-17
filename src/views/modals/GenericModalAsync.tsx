import {asyncComponent} from 'react-async-component';

const GenericModalAsync = asyncComponent({
    name: 'GenericModalAsync',
    serverMode: 'defer',
    resolve: () => {
        return import(/* webpackChunkName: "GenericModal" */ './GenericModal');
    },
});

export default GenericModalAsync;
