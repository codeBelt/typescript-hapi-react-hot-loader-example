import * as Hapi from 'hapi';

export default class ServerUtility {

    public static createLocationObject(request: Hapi.Request): any {
        const protocol: string = request.headers['x-forwarded-proto'];

        return {
            ...request.url,
            host: request.info.host,
            hostname: request.info.host.split(':')[0],
            href: `${protocol}://${request.info.host}${request.url.path}`,
            origin: `${protocol}://${request.info.host}`,
            pathname: request.url.path.split('?')[0],
            protocol: `${protocol}:`,
        };
    }

}
