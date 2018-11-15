import * as React from 'react';

interface IProps {}
interface IState {}

export default class Footer extends React.PureComponent<IProps, IState> {

    public render(): JSX.Element {
        return (
            <footer className="footer">
                <p>{'This footer is a deferred async component. It does not render server-side. It lazy loads on the client-side.'}</p>
            </footer>
        );
    }

}
