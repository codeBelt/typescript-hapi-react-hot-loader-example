import environment from './production';

export default {
    endpointUrl: {
        ...environment.endpointUrl,
        // override any endpoints
        randomuser: 'http://0.0.0.0:3000/api/mock-data/randomuser/data.json',
    },
    isProduction: false,
};
