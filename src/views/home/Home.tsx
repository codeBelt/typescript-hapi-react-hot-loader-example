import * as React from 'react';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import UserAction from '../../stores/user/UserAction';
import MetaAction from '../../stores/meta/MetaAction';
import IStore from '../../stores/IStore';
import {Dispatch} from 'redux';
import GenericModalAsync from '../modals/GenericModalAsync';
import ModalAction from '../../stores/modal/ModalAction';
import ExampleFormModalAsync from '../modals/ExampleFormModalAsync';
import IAction from '../../stores/IAction';
import {IProps as GenericModalProps} from '../modals/GenericModal';
import IUser from '../../stores/user/models/IUser';
import * as PropTypes from 'prop-types';

interface IState {}
interface IProps {}
interface IStateToProps {
    readonly user: IUser;
    readonly isLoadingUser: boolean;
}
interface IDispatchToProps {
    dispatch: (action: IAction<any>) => void;
}

const mapStateToProps = (state: IStore): IStateToProps => ({
    user: state.userReducer.currentUser,
    isLoadingUser: state.userReducer.isLoadingUser,
});
const mapDispatchToProps = (dispatch: Dispatch<IAction<any>>): IDispatchToProps => ({
    dispatch,
});

type PropsUnion = IStateToProps | IProps;

class Home extends React.Component<IStateToProps & IDispatchToProps & IProps, IState> {

    public static defaultProps: Partial<PropsUnion> = {
        // Need defaultProps so compiler doesn't complain about propTypes.
    };

    public static propTypes: Partial<PropsUnion> = {
        isLoadingUser: PropTypes.bool.isRequired,
    };

    public componentWillMount(): void {
        this.props.dispatch(MetaAction.setMeta({
            title: 'Home Page',
            description: 'This is the Home Page',
        }));
    }

    public render(): JSX.Element {
        const {user, isLoadingUser} = this.props;
        const showLoader: boolean = !user || isLoadingUser;

        return (
            <div>
                <div className="jumbotron">
                    {!showLoader && (
                        <>
                            <h1 className="display-3">{user.name.title} {user.name.first} {user.name.last}</h1>
                            <img
                                className="rounded mx-auto d-block"
                                src={user.picture.large}
                                alt=""
                            />
                        </>
                    )}
                    {showLoader && (
                        <div>
                            Loading ...
                        </div>
                    )}
                    <p>
                        <button
                            className="btn btn-lg btn-success"
                            onClick={this._loadUser}
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

    private _loadUser = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        this.props.dispatch(UserAction.loadUser());
    }

    private _onClickPushExample = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        this.props.dispatch(push('/About'));
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

        this.props.dispatch(ModalAction.addModal(genericModal));
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

        this.props.dispatch(ModalAction.addModal(genericModal));
    }

    private _onClickFormModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const formModal: JSX.Element = (
            <ExampleFormModalAsync isRequired={true} />
        );

        this.props.dispatch(ModalAction.addModal(formModal));
    }

}

export default connect<IStateToProps, IDispatchToProps, IProps>(mapStateToProps, mapDispatchToProps)(Home);
