import * as path from 'path';
import * as Hapi from 'hapi';
import IController from './IController';

class AssetsController implements IController {

    public mapRoutes(server: Hapi.Server): void {
        server.route({
            method: 'GET',
            path: '/assets/{file*}',
            handler: (request: Hapi.Request, reply: Hapi.ReplyNoContinue): void => {
                reply.file(path.resolve(__dirname, `../../public${request.path}`));
            },
        });
    }

}

export default AssetsController;
