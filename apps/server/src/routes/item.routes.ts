import { Router } from "express";
import ItemController from "../controller/item.controller";

class ItemRoute {
    router = Router();
    controller = new ItemController();

    constructor() {
        this.initializeRoute();
    }

    initializeRoute() {
        // Create new item 
        this.router.post("/", this.controller.create);

        // Retrieve all items
        this.router.get("/", this.controller.findAll);

        // Retrieve an item by id
        this.router.get("/:id", this.controller.findOne);

        // Update an item 
        this.router.put("/:id", this.controller.update);

        // Delete an item by id
        this.router.delete("/:id", this.controller.delete);

        // Delete all items 
        this.router.delete("/", this.controller.deleteAll)
    }
}

export default new ItemRoute().router;