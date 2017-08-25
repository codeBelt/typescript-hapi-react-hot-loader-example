import * as React from 'react';
import {connect} from 'react-redux';
import MetaAction from '../../store/meta/MetaAction';
import {Dispatch} from 'redux';
import IMetaReducerState from '../../interfaces/store/reducers/IMetaReducerState';
import IStore from '../../interfaces/store/IStore';
import ContactForm from './ContactForm';

interface IStateToProps {}

interface IDispatchToProps {
    setMeta: (meta: IMetaReducerState) => void;
}

const mapStateToProps = (state: IStore): IStateToProps => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchToProps => ({
    setMeta: (meta: IMetaReducerState) => dispatch(MetaAction.setMeta(meta)),
});

class Contact extends React.Component<IStateToProps & IDispatchToProps, {}> {

    public componentWillMount(): void {
        this.props.setMeta({title: 'Contact Page'});
    }

    public render(): JSX.Element {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">{'Contact'}</h1>
                    <p className="lead">{'This contact form uses redux-form to do client-side validation.'}</p>
                </div>
                <ContactForm />
            </div>
        );
    }

}

export default connect<IStateToProps, IDispatchToProps, {}>(mapStateToProps, mapDispatchToProps)(Contact);
