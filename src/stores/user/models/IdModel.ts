import {BaseModel} from 'sjs-base-model';

/*
    // Returned Api Data Sample
    {
      "name": "TFN",
      "value": "406524662"
    }
 */
export default class IdModel extends BaseModel {

    public readonly name: string = '';
    public readonly value: string = '';

    constructor(data: Partial<IdModel>) {
        super();

        this.update(data);
    }

    public update(data: Partial<IdModel>): void {
        super.update(data);
    }

}
