import * as React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {StaticRouter} from 'react-router';
import About from './views/about/About';
import Home from './views/home/Home';
import Contact from './views/contact/Contact';
import Footer from './views/landmarks/Footer';
import Header from './views/landmarks/Header';
import NotFound from './views/errors/NotFound';
import IStore from './interfaces/stores/IStore';
import ISagaStore from './interfaces/stores/ISagaStore';

interface IProviderWrapperProps {
    store: ISagaStore<IStore>;
    isServerSide: boolean;
    location?: string;
    context?: any;
}

const RouterWrapper: React.StatelessComponent<IProviderWrapperProps> = (props: IProviderWrapperProps): JSX.Element  => {
    const Router: any = props.isServerSide ? StaticRouter : BrowserRouter;

    return (
        <Provider store={props.store}>
            <Router
                context={props.context}
                location={props.location}
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
                            component={About}
                        />
                        <Route
                            path="/contact"
                            component={Contact}
                        />
                        <Redirect
                            from="/old-path"
                            to="/"
                        />
                        <Route component={NotFound} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        </Provider>
    );
};

export default RouterWrapper;
