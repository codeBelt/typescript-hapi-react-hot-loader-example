import * as React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {History, createMemoryHistory} from 'history';
import {StaticRouter} from 'react-router';
import {Route, Switch, Redirect} from 'react-router-dom';
import AboutAsync from './views/about/AboutAsync';
import Home from './views/home/Home';
import Contact from './views/contact/Contact';
import FooterAsync from './views/landmarks/FooterAsync';
import Header from './views/landmarks/Header';
import NotFoundAsync from './views/errors/NotFoundAsync';
import IStore from './stores/IStore';
import ISagaStore from './stores/ISagaStore';

interface IProviderWrapperProps {
    store: ISagaStore<IStore>;
    isServerSide: boolean;
    location?: string;
    context?: any;
    history?: History;
}

const RouterWrapper: React.StatelessComponent<IProviderWrapperProps> = (props: IProviderWrapperProps): JSX.Element  => {
    const Router: any = props.isServerSide ? StaticRouter : ConnectedRouter;
    const history: History = props.isServerSide ? createMemoryHistory() : props.history;

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
                </div>
            </Router>
        </Provider>
    );
};

export default RouterWrapper;
