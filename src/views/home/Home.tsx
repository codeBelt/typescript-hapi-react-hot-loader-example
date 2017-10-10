import * as React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import UserAction from '../../stores/user/UserAction';
import MetaAction from '../../stores/meta/MetaAction';
import IStore from '../../stores/IStore';
import {Dispatch} from 'redux';
import IMetaReducerState from '../../stores/meta/IMetaReducerState';
import IUserReducerState from '../../stores/user/IUserReducerState';

interface IState {}
interface IProps {}
interface IStateToProps {
    readonly user: IUserReducerState;
}
interface IDispatchToProps {
    historyPush: (route: string) => void;
    loadUser: () => void;
    setMeta: (meta: IMetaReducerState) => void;
}

const mapStateToProps = (state: IStore): IStateToProps => ({
    user: state.userReducer,
});
const mapDispatchToProps = (dispatch: Dispatch<IStore>): IDispatchToProps => ({
    historyPush: (route: string) => dispatch(push(route)),
    loadUser: () => dispatch(UserAction.loadUser()),
    setMeta: (meta: IMetaReducerState) => dispatch(MetaAction.setMeta(meta)),
});

class Home extends React.Component<IStateToProps & IDispatchToProps & IProps, IState> {

    private _onClickPushExampleHandler: (event: React.MouseEvent<HTMLButtonElement>) => void = this._onClickPushExample.bind(this);

    public componentWillMount(): void {
        this.props.setMeta({
            title: 'Home Page',
            description: 'This is the Home Page',
        });
    }

    public render(): JSX.Element {
        const user = this.props.user;

        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">{user.name.title} {user.name.first} {user.name.last}</h1>
                    <img
                        className="rounded mx-auto d-block"
                        src={user.picture.large}
                        alt=""
                    />
                    <p>
                        <button
                            className="btn btn-lg btn-success"
                            onClick={this.props.loadUser}
                        >
                            {'Load Another User'}
                        </button>
                    </p>
                </div>
                <button onClick={this._onClickPushExampleHandler}>{'Go to About'}</button>
            </div>
        );
    }

    private _onClickPushExample(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();

        this.props.historyPush('/About');
    }

}

export default connect<IStateToProps, IDispatchToProps, IProps>(mapStateToProps, mapDispatchToProps)(Home);
