import * as React from 'react';
import {connect} from 'react-redux';
import MetaAction from '../../stores/meta/MetaAction';
import IStore from '../../stores/IStore';
import {Dispatch} from 'redux';
import IAction from '../../stores/IAction';

interface IState {}
interface IProps {}
interface IStateToProps {}
interface IDispatchToProps {
    dispatch: (action: IAction<any>) => void;
}

const mapStateToProps = (state: IStore): IStateToProps => ({});
const mapDispatchToProps = (dispatch: Dispatch<IAction<any>>): IDispatchToProps => ({
    dispatch,
});

class NotFound extends React.Component<IStateToProps & IDispatchToProps & IProps, IState> {

    public componentWillMount(): void {
        this.props.dispatch(MetaAction.setMeta({title: '404 Page Not Found'}));
    }

    public render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">{'404'}</h1>
                    <p className="lead">{'We are sorry but the page you are looking for does not exist.'}</p>
                </div>
            </div>
        );
    }

}

export default connect<IStateToProps, IDispatchToProps, IProps>(mapStateToProps, mapDispatchToProps)(NotFound);
