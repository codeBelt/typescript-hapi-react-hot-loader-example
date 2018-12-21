import * as React from 'react';
import {connect} from 'react-redux';
import MetaAction from '../../stores/meta/MetaAction';
import {Dispatch} from 'redux';
import IStore from '../../stores/IStore';
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

class Contact extends React.Component<IStateToProps & IDispatchToProps & IProps, IState> {

    public componentWillMount(): void {
        this.props.dispatch(MetaAction.setMeta({title: 'Contact Page'}));
    }

    public render(): JSX.Element {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">{'Contact'}</h1>
                    <p className="lead">{'This contact form uses Formik to do client-side validation.'}</p>
                </div>
                <div>TODO: add Formik</div>
            </div>
        );
    }

}

export default connect<IStateToProps, IDispatchToProps, IProps>(mapStateToProps, mapDispatchToProps)(Contact);
