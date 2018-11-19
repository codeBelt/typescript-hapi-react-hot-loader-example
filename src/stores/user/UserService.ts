import HttpUtility from '../../utilities/HttpUtility';
import {AxiosResponse} from 'axios';
import UserModel from './models/UserModel';
import RandomUserResponseModel from './models/RandomUserResponseModel';
import environment from 'environment';

export default class UserService {

    private static _http: HttpUtility = new HttpUtility();

    public static async loadUser(): Promise<UserModel> {
        const endpoint: string = `${environment.endpointUrl.randomuser}?inc=picture,name,email,phone,id,dob`;

        try {
            const response: AxiosResponse = await UserService._http.get(endpoint);
            const randomUser = new RandomUserResponseModel(response.data);

            return randomUser.results[0];
        } catch (error) {
            console.error(`error`, error);
            return null;
        }
    }

}
