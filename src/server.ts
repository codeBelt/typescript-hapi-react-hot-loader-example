/*
 * module-alias is used to resolve the environment path for node.
 *
 * // import environment from 'environment';
 */
import * as moduleAlias from 'module-alias';
moduleAlias.addAliases({
    environment: `${__dirname}/environments/${process.env.NODE_ENV}.js`,
});

import 'fetch-everywhere';
import * as inert from 'inert';
import AssetsController from './server/controllers/AssetsController';
import HapiWebpackHotPlugin from './server/plugin/HapiWebpackHotPlugin';
import ReactController from './server/controllers/ReactController';
import ServerManager from './server/ServerManager';

(async () => {

    const manager = new ServerManager();

    await manager.registerPlugin(inert);

    if (manager.isDevelopment) {
        const hapiWebpackHotPlugin = new HapiWebpackHotPlugin();

        await manager.registerPlugin(hapiWebpackHotPlugin.plugin);
    }

    manager.registerController(new AssetsController());
    manager.registerController(new ReactController());

    await manager.startServer();

})();
