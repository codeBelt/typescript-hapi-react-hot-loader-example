import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import IStore from '../../stores/IStore';
import IAction from '../../stores/IAction';

interface IState {}
interface IProps {}
interface IStateToProps {
    readonly currentModal: JSX.Element;
}
interface IDispatchToProps {}

const mapStateToProps = (state: IStore): IStateToProps => ({
    currentModal: state.modalReducer.currentModal,
});
const mapDispatchToProps = (dispatch: Dispatch<IAction<any>>): IDispatchToProps => ({});

class ModalHub extends React.Component<IStateToProps & IDispatchToProps & IProps, IState> {

    public render(): JSX.Element {
        return this.props.currentModal;
    }

}

export default connect<IStateToProps, IDispatchToProps, IProps>(mapStateToProps, mapDispatchToProps)(ModalHub);
