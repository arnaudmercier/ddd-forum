export interface Config {
    port: number;
    db: {
        user: string;
        host: string;
        database: string;
        password: string;
        port: number;
    };
}
