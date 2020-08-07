export type Environment = 'development' | 'test' | 'production';
export interface IAppConfig {
    port: number,
    environment: Environment
};