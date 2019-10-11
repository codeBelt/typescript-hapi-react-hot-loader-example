interface Window {
    __STATE__?: any;
    __ASYNC_COMPONENTS_STATE__?: any;
}

declare namespace NodeJS {
    interface Global {
        document: Document;
        window: Window;
        navigator: Navigator;
    }
}

declare module '*.css';
declare module '*.scss';

declare module 'form2js';
declare module 'react-async-bootstrapper';
declare module 'react-async-component';
declare module 'hapi-webpack-plugin';
declare module 'redux-freeze';

declare module 'environment' {
    const value: {
        isProduction: boolean;
        endpointUrl: {
            randomuser: string;
        }
    };

    export default value;
}
