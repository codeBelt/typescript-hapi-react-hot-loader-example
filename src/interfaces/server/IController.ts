import * as Hapi from 'hapi';

interface IController {
    mapRoutes(server: Hapi.Server): void;
}

export default IController;
