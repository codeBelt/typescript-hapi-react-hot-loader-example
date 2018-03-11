import * as Hapi from 'hapi';
import IController from './IController';

class AssetsController implements IController {

    public mapRoutes(server: Hapi.Server): void {
        server.route({
            method: 'GET',
            path: '/assets/{file*}',
            handler: {
                directory: {
                    path: '.',
                    redirectToSlash: true,
                    index: true,
                },
            },
        });
    }

}

export default AssetsController;
