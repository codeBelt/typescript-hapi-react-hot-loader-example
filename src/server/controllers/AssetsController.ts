import * as Hapi from 'hapi';
import * as path from 'path';
import IController from './IController';
import RequestMethodEnum from '../../constants/RequestMethodEnum';

class AssetsController implements IController {

    public mapRoutes(server: Hapi.Server): void {
        server.route({
            method: RequestMethodEnum.GET,
            path: '/assets/{file*}',
            handler: (request: Hapi.Request, h: any): Promise<any> => {
                return h.file(path.resolve(__dirname, `../../public${request.path}`));
            },
        });
    }

}

export default AssetsController;
