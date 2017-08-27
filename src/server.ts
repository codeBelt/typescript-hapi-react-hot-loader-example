import 'fetch-everywhere';
import * as inert from 'inert';
import ServerManager from './server/ServerManager';
import AssetsController from './server/controllers/AssetsController';
import ReactController from './server/controllers/ReactController';
import HapiWebpackHotPlugin from './server/plugin/HapiWebpackHotPlugin';

const manager = new ServerManager();

manager.registerPlugin(inert);

if (manager.isDevelopment) {
    new HapiWebpackHotPlugin(manager.server); // tslint:disable-line
}

manager.registerController(new AssetsController());
manager.registerController(new ReactController());
manager.startServer();
