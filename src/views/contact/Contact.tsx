import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import IStore from '../../stores/IStore';
import ContactForm from './ContactForm';
import IAction from '../../stores/IAction';
import Helmet from 'react-helmet-async';

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

    public render(): JSX.Element {
        return (
            <div>
                <Helmet>
                    <title>Contact Page</title>
                    <meta name="description" content="This is the Contact Page" />
                </Helmet>
                <div className="jumbotron">
                    <h1 className="display-3">{'Contact'}</h1>
                    <p className="lead">{'This contact form uses redux-form to do client-side validation.'}</p>
                </div>
                <ContactForm />
            </div>
        );
    }

}

export default connect<IStateToProps, IDispatchToProps, IProps>(mapStateToProps, mapDispatchToProps)(Contact);
