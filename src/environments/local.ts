import environment from './production';

export default {
    endpointUrl: {
        ...environment.endpointUrl,
        // override any endpoints
        randomuser: '/api/mock-data/randomuser/data.json',
    },
    isProduction: false,
};
