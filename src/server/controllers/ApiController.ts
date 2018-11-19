// import * as path from 'path';
import * as Hapi from 'hapi';
import IController from './IController';
import RequestMethodEnum from '../../constants/RequestMethodEnum';
// import * as util from 'util';
// import * as fs from 'fs';

// const readFileAsync = util.promisify(fs.readFile);

export default class ApiController implements IController {

    public mapRoutes(server: Hapi.Server): void {
        server.route({
            method: RequestMethodEnum.Get,
            path: '/api/{path*}',
            handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<any> => {
                // const jsonPath = path.resolve(__dirname, `../../public${request.path}`);

                // const json = await readFileAsync(jsonPath, 'utf8');

                // console.log(`JSON.parse(json)`, JSON.parse(json));
                return {
                    "results": [
                        {
                            "name": {
                                "title": "mrs",
                                "first": "clara",
                                "last": "nielsen"
                            },
                            "email": "clara.nielsen@example.com",
                            "dob": {
                                "date": "1992-07-13T03:28:06Z",
                                "age": 26
                            },
                            "phone": "76661752",
                            "id": {
                                "name": "CPR",
                                "value": "192779-0944"
                            },
                            "picture": {
                                "large": "https://randomuser.me/api/portraits/women/21.jpg",
                                "medium": "https://randomuser.me/api/portraits/med/women/21.jpg",
                                "thumbnail": "https://randomuser.me/api/portraits/thumb/women/21.jpg"
                            }
                        }
                    ],
                    "info": {
                        "seed": "8a33ce0664c198bc",
                        "results": 1,
                        "page": 1,
                        "version": "1.2"
                    }
                }
            },
        });
    }

}
