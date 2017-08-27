import * as Hapi from 'hapi';
import IController from '../interfaces/server/IController';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const NODE_ENV = process.env.NODE_ENV;

class ServerManager {

    public isDevelopment: boolean = (NODE_ENV === 'development');

    private _server: Hapi.Server = new Hapi.Server({debug: {request: ['error']}});

    public get server(): Hapi.Server {
        return this._server;
    }

    constructor() {
        this._server.connection({
            host: HOST,
            port: PORT,
        });
    }

    public static log(): void {
        console.info(`\n\nServer running in ${NODE_ENV} mode at: http://${HOST}:${PORT}\n`);
    }

    public async registerPlugin(pluginConfig: any): Promise<void> {
        await this._server.register(pluginConfig);
    }

    public registerController(controller: IController): void {
        controller.mapRoutes(this._server);
    }

    public startServer(): void {
        this._server.start((error: Error) => {
            if (error) {
                throw error;
            }

            if (!this.isDevelopment) {
                ServerManager.log();
            }
        });
    }

}

export default ServerManager;
