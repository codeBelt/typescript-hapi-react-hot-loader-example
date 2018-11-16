import * as Hapi from 'hapi';
import IController from './controllers/IController';

export default class ServerManager {

    public static readonly PORT: number = parseInt(process.env.PORT, 10) || 3000;
    public static readonly HOST: string = process.env.HOST || '0.0.0.0';
    public static readonly NODE_ENV: string = process.env.NODE_ENV;

    public isDevelopment: boolean = (ServerManager.NODE_ENV !== 'production');

    private _server: Hapi.Server = null;

    public get server(): Hapi.Server {
        return this._server;
    }

    constructor() {
        const options: Hapi.ServerOptions = {
            host: ServerManager.HOST,
            port: ServerManager.PORT,
        };

        this._server = new Hapi.Server(options);
    }

    public static log(): void {
        console.info(`\n\nServer running in ${ServerManager.NODE_ENV} mode at: http://${ServerManager.HOST}:${ServerManager.PORT}\n`);
    }

    public async registerPlugin(pluginConfig: any): Promise<void> {
        await this._server.register(pluginConfig);
    }

    public registerController(controller: IController): void {
        controller.mapRoutes(this._server);
    }

    public async startServer(): Promise<void> {
        process.on('unhandledRejection', (error: Error) => {
            console.error(error);
            process.exit(1);
        });

        try {
            await this._server.start();

            if (!this.isDevelopment) {
                ServerManager.log();
            }
        } catch (err) {
            console.error(err);
        }
    }

}
