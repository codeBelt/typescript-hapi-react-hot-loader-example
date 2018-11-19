import {BaseModel} from 'sjs-base-model';
import UserModel from './UserModel';

/*
    // Returned Api Data Sample
    {
      "results": [
        {
          "name": {
            "title": "mrs",
            "first": "frances",
            "last": "reynolds"
          },
          "email": "frances.reynolds@example.com",
          "dob": {
            "date": "1966-03-19T23:24:27Z",
            "age": 52
          },
          "phone": "01-1488-2236",
          "id": {
            "name": "TFN",
            "value": "406524662"
          },
          "picture": {
            "large": "https://randomuser.me/api/portraits/women/50.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/50.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/50.jpg"
          }
        }
      ],
      "info": {
        "seed": "cef175b8463ecc54",
        "results": 1,
        "page": 1,
        "version": "1.2"
      }
    }
 */
export default class RandomUserResponseModel extends BaseModel {

    public readonly results: UserModel[] = [UserModel as any];

    constructor(data: Partial<RandomUserResponseModel>) {
        super();

        this.update(data);
    }

    public update(data: Partial<RandomUserResponseModel>): void {
        super.update(data);
    }

}
