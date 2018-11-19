import {BaseModel} from 'sjs-base-model';
import NameModel from './NameModel';
import IdModel from './IdModel';
import PictureModel from './PictureModel';
import DobModel from './DobModel';

/*
    // Returned Api Data Sample
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
 */
export default class UserModel extends BaseModel {

    public readonly name: NameModel = NameModel as any;
    public readonly email: string = '';
    public readonly dob: DobModel = DobModel as any;
    public readonly phone: string = '';
    public readonly id: IdModel = IdModel as any;
    public readonly picture: PictureModel = PictureModel as any;

    constructor(data: Partial<UserModel>) {
        super();

        this.update(data);
    }

    public update(data: Partial<UserModel>): void {
        super.update(data);
    }

}
