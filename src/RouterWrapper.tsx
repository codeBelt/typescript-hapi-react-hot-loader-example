import * as React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {History} from 'history';
import {Redirect, Route, StaticRouter, Switch} from 'react-router-dom';
import AboutAsync from './views/about/AboutAsync';
import Home from './views/home/Home';
import Contact from './views/contact/Contact';
import FooterAsync from './views/landmarks/FooterAsync';
import Header from './views/landmarks/Header';
import NotFoundAsync from './views/errors/NotFoundAsync';
import ISagaStore from './stores/ISagaStore';
import ModalHub from './views/modals/ModalHub';

interface IProviderWrapperProps {
    store: ISagaStore;
    isServerSide: boolean;
    location?: string;
    context?: any;
    history?: History;
}

const RouterWrapper: React.StatelessComponent<IProviderWrapperProps> = (props: IProviderWrapperProps): JSX.Element => {
    const Router: any = props.isServerSide ? StaticRouter : ConnectedRouter;
    const history: History = props.isServerSide ? null : props.history;

    return (
        <Provider store={props.store}>
            <Router
                context={props.context}
                location={props.location}
                history={history}
            >
                <div className="container">
                    <Header />
                    <Switch>
                        <Route
                            exact={true}
                            path="/"
                            component={Home}
                        />
                        <Route
                            path="/about"
                            component={AboutAsync}
                        />
                        <Route
                            path="/contact"
                            component={Contact}
                        />
                        <Redirect
                            from="/old-path"
                            to="/"
                        />
                        <Route component={NotFoundAsync} />
                    </Switch>
                    <FooterAsync />
                    <ModalHub />
                </div>
            </Router>
        </Provider>
    );
};

export default RouterWrapper;
