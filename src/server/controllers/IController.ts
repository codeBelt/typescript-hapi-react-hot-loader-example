import * as Hapi from 'hapi';

export default interface IController {
    mapRoutes(server: Hapi.Server): void;
}
