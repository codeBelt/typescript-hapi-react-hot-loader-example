import IAction from '../IAction';

class LoadingAction {

    public static readonly SET_LOADING: string = 'LoadingAction.SET_LOADING';

    public static showLoader(isLoading: boolean): IAction<boolean> {
        return {
            type: LoadingAction.SET_LOADING,
            payload: isLoading,
        };
    }

}

export default LoadingAction;
