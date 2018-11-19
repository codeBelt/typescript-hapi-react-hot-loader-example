import environment from './production';

export default {
    endpointUrl: {
        ...environment.endpointUrl,
        // override any endpoints
    },
    isProduction: false,
};
