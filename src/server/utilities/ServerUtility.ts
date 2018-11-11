import * as Hapi from 'hapi';
import * as url from 'url';
import * as path from 'path';
import * as util from 'util';
import * as fs from 'fs';

const readFileAsync = util.promisify(fs.readFile);

export interface IServerLocation extends url.Url {
    host: string;
    hostname: string;
    href: string;
    origin: string;
    pathname: string;
    protocol: string;
    length: number;
}

export default class ServerUtility {

    public static createLocationObject(request: Hapi.Request): IServerLocation {
        const protocol: string = request.headers['x-forwarded-proto'] || request.server.info.protocol;

        return {
            ...request.url,
            host: request.info.host,
            hostname: request.info.host.split(':')[0],
            href: `${protocol}://${request.info.host}${request.url.path}`,
            origin: `${protocol}://${request.info.host}`,
            pathname: request.url.path.split('?')[0],
            protocol: `${protocol}:`,
            length: null,
        };
    }

    public static async loadHtmlFile(): Promise<string> {
        const htmlPath = path.resolve(__dirname, '../../public/index.html');

        return readFileAsync(htmlPath, 'utf8');
    }

}
