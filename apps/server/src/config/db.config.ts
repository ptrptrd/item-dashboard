export const config = {
    HOST: 'db',
    USER: 'postgres',
    PASSWORD: 'postgres',
    DB: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 1000
    }
};

export const dialect = 'postgres';