import {BaseModel} from 'sjs-base-model';

/*
    // Returned Api Data Sample
    {
      "date": "1966-03-19T23:24:27Z",
      "age": 52
    }
 */
export default class DobModel extends BaseModel {

    public readonly date: string = '';
    public readonly age: number = null;

    constructor(data: Partial<DobModel>) {
        super();

        this.update(data);
    }

    public update(data: Partial<DobModel>): void {
        super.update(data);
    }

}
