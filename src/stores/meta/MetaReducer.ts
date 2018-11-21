import MetaAction, {MetaActionUnion} from './MetaAction';
import IMetaReducerState from './IMetaReducerState';
import IAction from '../IAction';
import ITitleDescription from './models/ITitleDescription';

export default class MetaReducer {

    private static readonly _initialState: IMetaReducerState = {
        title: 'Robert is cool',
        description: '',
    };

    public static reducer(state: IMetaReducerState = MetaReducer._initialState, action: IAction<MetaActionUnion>): IMetaReducerState {
        switch (action.type) {
            case MetaAction.SET_META:
                const model: ITitleDescription = action.payload as ITitleDescription;

                return {
                    ...state,
                    description: model.description || '',
                    title: model.title,
                };
            default:
                return state;
        }
    }

}
