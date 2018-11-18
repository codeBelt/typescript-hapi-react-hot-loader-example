import {BaseModel} from 'sjs-base-model';

/*
    // Returned Api Data Sample
    {
      "title": "mrs",
      "first": "frances",
      "last": "reynolds"
    }
 */
export default class NameModel extends BaseModel {

    public readonly title: string = '';
    public readonly first: string = '';
    public readonly last: string = '';

    /*
     * Client-Side properties. Not returned from API.
     */
    public fullName: string = '';

    constructor(data: Partial<NameModel>) {
        super();

        this.update(data);
    }

    public update(data: Partial<NameModel>): void {
        super.update(data);

        this.fullName = `${this.first} ${this.last}`;
    }

}
