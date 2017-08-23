import * as Webpack from 'webpack';
import * as HapiWebpackPlugin from 'hapi-webpack-plugin';
import * as notifier from 'node-notifier';
import * as Hapi from 'hapi';
import ServerManager from '../ServerManager';

class HapiWebpackHotPlugin {

    constructor(server: Hapi.Server) {
        const config: Webpack.Configuration = require('../../../webpack.config.js');
        const compiler: Webpack.Compiler = Webpack(config);

        compiler.plugin('done', (stats: any) => this._onDone(stats));

        const options = {
            assets: {
                // webpack-dev-middleware options - https://github.com/webpack/webpack-dev-middleware
                index: '/public/index.html',
            },
            hot: {
                // webpack-hot-middleware options - https://github.com/glenjamin/webpack-hot-middleware
            },
            compiler,
        };

        server.register({
            register: HapiWebpackPlugin,
            options,
        }, (error: Error) => {
            if (error) {
                console.error(error);
            }
        });
    }

    private _onDone(stats: any): void {
        const pkg = require('../../../package.json');
        const time = ((stats.endTime - stats.startTime) / 1000).toFixed(2);

        setTimeout(() => {
            ServerManager.log();
        }, 0);

        notifier.notify({
            title: pkg.name,
            message: `WebPack is done!\n${stats.compilation.errors.length} errors in ${time}s`,
            timeout: 1,
        } as any);
    }

}

export default HapiWebpackHotPlugin;
