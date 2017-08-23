import * as React from 'react';

interface IProps {}
interface IState {}

class Footer extends React.PureComponent<IProps, IState> {

    public render(): JSX.Element {
        return (
            <footer className="footer">
                <p>&copy; {'Company 2017'}</p>
            </footer>
        );
    }

}

export default Footer;
