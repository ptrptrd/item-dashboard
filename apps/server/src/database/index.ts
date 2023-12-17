import { Sequelize } from "sequelize-typescript";
import { config, dialect } from "../config/db.config";
import Item from "../models/item.model";

class Database {
    public sequelize: Sequelize | undefined;

    constructor(){
        this.connectToDatabase()
    }

    private async connectToDatabase() {
        this.sequelize = new Sequelize({
            database: config.DB, 
            username: config.USER, 
            password: config.PASSWORD,
            host: config.HOST, 
            dialect: dialect, 
            pool: {
                max: config.pool.max,
                min: config.pool.min,
                acquire: config.pool.acquire, 
                idle: config.pool.idle,
            },
            models: [Item]
        });

        await this.sequelize
            .authenticate()
            .then(() => {
                console.log("Connection has been established");
            })
            .catch((err) => {
                console.log("Unable to connect to database: " + err);
            });
    }
}

export default Database;