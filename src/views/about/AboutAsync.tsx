import {asyncComponent} from 'react-async-component';

const AboutAsync = asyncComponent({
    name: 'AboutAsync',
    serverMode: 'resolve',
    resolve: () => {
        return import(/* webpackChunkName: "About" */ './About');
    },
});

export default AboutAsync;
