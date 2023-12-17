import { Application } from "express";
import itemRoute from "./item.routes";

export default class Routes {
    constructor(app: Application) {
        app.use("/api/items", itemRoute)
    }
}