import axios, {AxiosResponse } from 'axios';
import RequestMethodEnum from '../constants/RequestMethodEnum';

// http://httpstat.us
export default class HttpUtility {

    public async get(endpoint: string): Promise<AxiosResponse<any>> {
        const request = new Request(endpoint, {
            method: RequestMethodEnum.Get,
        });

        return this._fetch(request);
    }

    // TODO: finish setting up
    public async post(endpoint: string): Promise<AxiosResponse<any>> {
        const request = new Request(endpoint, {
            method: RequestMethodEnum.Post,
        });

        return this._fetch(request);
    }

    // TODO: finish setting up
    public async put(endpoint: string): Promise<AxiosResponse<any>> {
        const request = new Request(endpoint, {
            method: RequestMethodEnum.Put,
        });

        return this._fetch(request);
    }

    // TODO: finish setting up
    public async delete(endpoint: string): Promise<AxiosResponse<any>> {
        const request = new Request(endpoint, {
            method: RequestMethodEnum.Delete,
        });

        return this._fetch(request);
    }

    private async _fetch(request: Request, init?: any): Promise<AxiosResponse<any>> {
        try {
            return await axios({
                data: init,
                method: request.method,
                url: request.url,
            });
        } catch (error) {
            console.error(`error`, error);

            return error;
        }
    }

}
