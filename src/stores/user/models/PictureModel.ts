import {BaseModel} from 'sjs-base-model';

/*
    // Returned Api Data Sample
    {
      "large": "https://randomuser.me/api/portraits/women/50.jpg",
      "medium": "https://randomuser.me/api/portraits/med/women/50.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/women/50.jpg"
    }
 */
export default class PictureModel extends BaseModel {

    public readonly large: string = '';
    public readonly medium: string = '';
    public readonly thumbnail: string = '';

    constructor(data: Partial<PictureModel>) {
        super();

        this.update(data);
    }

    public update(data: Partial<PictureModel>): void {
        super.update(data);
    }

}
