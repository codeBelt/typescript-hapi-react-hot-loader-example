import * as React from 'react';
import {connect} from 'react-redux';
import IStore from '../../stores/IStore';
import {Dispatch} from 'redux';
import IAction from '../../stores/IAction';
import {Helmet} from 'react-helmet';

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

    public render() {
        return (
            <div>
                <Helmet>
                    <title>404 Page</title>
                    <meta name="description" content="This is the 404 Page" />
                </Helmet>
                <div className="jumbotron">
                    <h1 className="display-3">{'404'}</h1>
                    <p className="lead">{'We are sorry but the page you are looking for does not exist.'}</p>
                </div>
            </div>
        );
    }

}

export default connect<IStateToProps, IDispatchToProps, IProps>(mapStateToProps, mapDispatchToProps)(NotFound);
