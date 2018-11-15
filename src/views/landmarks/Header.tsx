import * as React from 'react';
import {NavLink} from 'react-router-dom';

interface IProps {}
interface IState {}

export default class Header extends React.Component<IProps, IState> {

    public render(): JSX.Element {
        return (
            <div className="header clearfix">
                <nav>
                    <ul className="nav nav-pills float-right">
                        <li className="nav-item">
                            <NavLink
                                exact={true}
                                className="nav-link"
                                activeClassName="active"
                                to="/"
                            >
                                {'Home'}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                to="/about"
                            >
                                {'About'}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                to="/contact"
                            >
                                {'Contact'}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <h3 className="text-muted">{'Star My Github Repo!'}</h3>
            </div>
        );
    }

}
