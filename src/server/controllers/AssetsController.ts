import path from 'path';
import * as Hapi from 'hapi';
import IController from '../../interfaces/IController';

class AssetsController implements IController{

    public mapRoutes(server: Hapi.Server): void {
        server.route({
            method: 'GET',
            path: '/assets/{file*}',
            handler: (request: hapi.Request, reply: hapi.ReplyNoContinue) => {
                reply.file(path.resolve(__dirname, `../../public${request.path}`));
            },
        });
    }

}

export default AssetsController;
