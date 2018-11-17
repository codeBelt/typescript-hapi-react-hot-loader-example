import * as React from 'react';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import UserAction from '../../stores/user/UserAction';
import MetaAction from '../../stores/meta/MetaAction';
import IStore from '../../stores/IStore';
import {Dispatch} from 'redux';
import IMetaReducerState from '../../stores/meta/IMetaReducerState';
import IUserReducerState from '../../stores/user/IUserReducerState';
import GenericModalAsync from '../modals/GenericModalAsync';
import ModalAction from '../../stores/modal/ModalAction';
import ExampleFormModalAsync from '../modals/ExampleFormModalAsync';
import IAction from '../../stores/IAction';
import {IProps as GenericModalProps} from '../modals/GenericModal';

interface IState {}
interface IProps {}
interface IStateToProps {
    readonly user: IUserReducerState;
}
interface IDispatchToProps {
    historyPush: (route: string) => void;
    loadUser: () => void;
    setMeta: (meta: IMetaReducerState) => void;
    addModal: (modal: JSX.Element) => void;
}

const mapStateToProps = (state: IStore): IStateToProps => ({
    user: state.userReducer,
});
const mapDispatchToProps = (dispatch: Dispatch<IAction<any>>): IDispatchToProps => ({
    historyPush: (route: string) => dispatch(push(route)),
    loadUser: () => dispatch(UserAction.loadUser()),
    setMeta: (meta: IMetaReducerState) => dispatch(MetaAction.setMeta(meta)),
    addModal: (modal: JSX.Element) => dispatch(ModalAction.addModal(modal)),
});

class Home extends React.Component<IStateToProps & IDispatchToProps & IProps, IState> {

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
                <ol>
                    <li><button onClick={this._onClickPushExample}>{'Example of Manual Routing'}</button></li>
                    <li><button onClick={this._onClickOpenModal}>{'Open Example Generic Modal'}</button></li>
                    <li><button onClick={this._onClickFormModal}>{'Open Example Form Modal'}</button></li>
                </ol>
            </div>
        );
    }

    private _onClickPushExample = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        this.props.historyPush('/About');
    }

    private _onClickOpenModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        const genericModal: JSX.Element = (
            <GenericModalAsync
                message={(
                    <div>
                        <h3>{'Generic Modal'}</h3>
                        <p>{'Example of a generic modal. Used for simple messages.'}</p>
                    </div>
                )}
                acceptLabel={'Open Another Modal'}
                rejectLabel={'Close'}
                onAccept={this._onAccept}
            />
        );

        this.props.addModal(genericModal);
    }

    private _onAccept = (modalProps: GenericModalProps): void => {
        const genericModal: JSX.Element = (
            <GenericModalAsync
                message={(
                    <div>
                        <p>{'Handles opening multiple modals.'}</p>
                    </div>
                )}
                acceptLabel={'Ok'}
            />
        );

        this.props.addModal(genericModal);
    }

    private _onClickFormModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const formModal: JSX.Element = (
            <ExampleFormModalAsync isRequired={true} />
        );

        this.props.addModal(formModal);
    }

}

export default connect<IStateToProps, IDispatchToProps, IProps>(mapStateToProps, mapDispatchToProps)(Home);
