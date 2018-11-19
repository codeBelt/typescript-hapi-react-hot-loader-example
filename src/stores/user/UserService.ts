import HttpUtility from '../../utilities/HttpUtility';
import {AxiosResponse} from 'axios';
import IUser from './models/IUser';
import environment from 'environment';

export default class UserService {

    private static _http: HttpUtility = new HttpUtility();

    public static async loadUser(): Promise<IUser> {
        const endpoint: string = `${environment.endpointUrl.randomuser}?inc=picture,name,email,phone,id,dob`;
        const response: AxiosResponse = await UserService._http.get(endpoint);

        return response.data.results[0];
    }

}
