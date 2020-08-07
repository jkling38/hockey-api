import {Environment, IAppConfig} from "../types/environment";

const getEnvironment = (): Environment => {
    let processEnv: string = (process.env.NODE_ENV || 'development');

    switch (processEnv) {
        case 'test':
            return 'test';
        case 'development':
            return 'development';
        case 'production':
            return 'production';
        default:
            return 'development';
    }
}

const getPort = (): number => {
    let processPort: string = process.env.PORT || '0';

    if (Number(processPort)) {
        return Number(processPort);
    }

    return 3000;
}

const appConfig: IAppConfig = {
    environment: getEnvironment(),
    port: getPort()
};

export default appConfig;