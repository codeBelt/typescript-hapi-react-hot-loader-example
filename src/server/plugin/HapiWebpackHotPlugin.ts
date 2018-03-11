import * as Hapi from 'hapi';
import * as HapiWebpackPlugin from 'hapi-webpack-plugin';
import * as notifier from 'node-notifier';
import * as Webpack from 'webpack';
import ServerManager from '../ServerManager';

class HapiWebpackHotPlugin {

    public get plugin(): Hapi.ServerRegisterPluginObject<any> {
        const config: Webpack.Configuration = require('../../../webpack.config.js'); // tslint:disable-line no-require-imports
        const compiler: Webpack.Compiler = Webpack(config);

        compiler.plugin('done', (stats: any) => this._onDone(stats));

        const assets = {
            // webpack-dev-middleware options - See https://github.com/webpack/webpack-dev-middleware
            index: '/public/index.html',
        };

        const hot = {
            // webpack-hot-middleware options - See https://github.com/glenjamin/webpack-hot-middleware
        };

        return {
            plugin: HapiWebpackPlugin,
            options: {compiler, assets, hot},
        };
    }

    private _onDone(stats: any): void {
        const pkg = require('../../../package.json'); // tslint:disable-line no-require-imports
        const time: string = ((stats.endTime - stats.startTime) / 1000).toFixed(2);

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
