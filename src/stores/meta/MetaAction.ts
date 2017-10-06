import IMetaReducerState from './IMetaReducerState';
import IAction from '../IAction';

class MetaAction {

    public static readonly SET_META: symbol = Symbol('SET_META');

    public static setMeta(meta: IMetaReducerState): IAction<IMetaReducerState>  {
        if (global.document) {
            global.document.title = meta.title;
        }

        return {
            type: MetaAction.SET_META,
            payload: meta,
        };
    }

}

export default MetaAction;
