import 'fetch-everywhere';
import ServerManager from './server/ServerManager';
import ReactController from './server/controllers/ReactController';
import HapiWebpackHotPlugin from './server/plugin/HapiWebpackHotPlugin';
import AssetsController from './server/controllers/AssetsController';

(async () => {

    const manager = new ServerManager();

    if (manager.isDevelopment) {
        const hapiWebpackHotPlugin = new HapiWebpackHotPlugin();

        await manager.registerPlugin(hapiWebpackHotPlugin.plugin);
    }

    manager.registerController(new AssetsController());
    manager.registerController(new ReactController());

    await manager.startServer();

})();
