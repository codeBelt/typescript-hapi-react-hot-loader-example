import * as React from 'react';
import {connect} from 'react-redux';
import UserAction from '../../store/user/UserAction';
import MetaAction from '../../store/meta/MetaAction';
import IStore from '../../interfaces/store/IStore';
import {Dispatch} from 'redux';
import IMetaReducerState from '../../interfaces/store/reducers/IMetaReducerState';
import IUserReducerState from '../../interfaces/store/reducers/IUserReducerState';

interface IStateToProps {
    readonly user: IUserReducerState;
}

interface IDispatchToProps {
    loadUser: () => void;
    setMeta: (meta: IMetaReducerState) => void;
}

const mapStateToProps = (state: IStore): IStateToProps => ({
    user: state.userReducer,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchToProps => ({
    loadUser: () => dispatch(UserAction.loadUser()),
    setMeta: (meta: IMetaReducerState) => dispatch(MetaAction.setMeta(meta)),
});

class Home extends React.Component<IStateToProps & IDispatchToProps, {}> {

    componentWillMount(): void {
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
            </div>
        );
    }

}

export default connect<IStateToProps, IDispatchToProps, {}>(mapStateToProps, mapDispatchToProps)(Home);

