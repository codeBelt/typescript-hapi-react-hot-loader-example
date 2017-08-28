import * as React from 'react';
import {connect} from 'react-redux';
import MetaAction from '../../stores/meta/MetaAction';
import IMetaReducerState from '../../interfaces/store/reducers/IMetaReducerState';
import IStore from '../../interfaces/store/IStore';
import {Dispatch} from 'redux';

interface IStateToProps {}

interface IDispatchToProps {
    setMeta: (meta: IMetaReducerState) => void;
}

const mapStateToProps = (state: IStore): IStateToProps => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchToProps => ({
    setMeta: (meta: IMetaReducerState) => dispatch(MetaAction.setMeta(meta)),
});

class NotFound extends React.Component<IStateToProps & IDispatchToProps, {}> {

    public componentWillMount(): void {
        this.props.setMeta({title: '404 Page Not Found'});
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

export default connect<IStateToProps, IDispatchToProps, {}>(mapStateToProps, mapDispatchToProps)(NotFound);
