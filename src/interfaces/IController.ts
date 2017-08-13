import * as hapi from 'hapi';

interface IController {
    mapRoutes(server: hapi.Server): void;
}

export default IController;
