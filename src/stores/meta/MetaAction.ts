import IAction from '../IAction';
import ITitleDescription from './models/ITitleDescription';

export type ActionUnion = ITitleDescription;

export default class MetaAction {

    public static readonly SET_META: string = 'MetaAction.SET_META';

    public static setMeta(meta: ITitleDescription): IAction<ITitleDescription> {
        if (global.document) {
            global.document.title = meta.title;
        }

        return {
            type: MetaAction.SET_META,
            payload: meta,
        };
    }

}
