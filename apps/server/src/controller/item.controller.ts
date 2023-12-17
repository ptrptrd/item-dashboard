import { Request, Response } from "express";
import Item from "../models/item.model";
import itemRepository from "../repositories/item.repository";

export default class ItemController {
    async create (req: Request, res: Response) {
        if (!req.body.name) {
            res.status(400).send({
                message: "Content cannot be empty!"
            });
            return; 
        }

        try {
            const item: Item = req.body; 

            const savedItem = await itemRepository.save(item)

            res.status(201).send(savedItem)
        } catch (err) {
            res.status(500).send({
                message: "Error occured when creating item: " + err
            });
        }
    }

    async findAll (req: Request, res: Response) {
        const name = typeof req.query.name === "string" ? req.query.name : "";

        try {
            const items = await itemRepository.retrieveAll({ name })

            res.status(200).send(items);
        } catch (err) {
            res.status(500).send({
                message: "Error occured when retrieving items: " + err
            });
        }
    }

    async findOne (req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        try {
            const item = await itemRepository.retrieveById(id)

            if (item) {
                res.status(200).send(item)
            } else {
                res.status(404).send({
                    message: "Cannot find item with id: " + id
                })
            }
        } catch (err) {
            res.status(500).send({
                message: `Error when retrieving item with id ${id}: ${err}`
            });
        }
    }

    async update (req: Request, res: Response) {
        const item: Item = req.body

        if (!item) {
            res.status(400).send({
                message: "Content cannot be empty!"
            });
            return; 
        }

        try {
            const num = await itemRepository.update(item)

            if (num == 1) {
                res.send({
                    message: "Item is updated successfully"
                });
            } else {
                res.send({
                    message: "Failed to update item with id: " + item.id
                })
            }
        } catch (err) {
            res.status(500).send({
                message: `Error when updating item with id ${item.id}: ${err}`
            });
        }
    }

    async delete (req: Request, res: Response) {
        const id: number = parseInt(req.params.id)

        if (!id) {
            res.status(400).send({
                message: "Content cannot be empty!"
            });
            return;
        }

        try {
            const num = await itemRepository.delete(id)

            if (num == 1) {
                res.send({
                    message: "Item was deleted successfully"
                });
            } else {
                res.send({
                    message: `Could not delete item with id ${id}`
                });
            }
        } catch (err) {
            res.status(500).send({
                message: `Error when deleting item with id ${id}: ${err}`
            })
        }
    }

    async deleteAll (req: Request, res: Response) {
        try {
            const num = await itemRepository.deleteAll();

            if (num > 0) {
                res.send({
                    message: `${num} item(s) were deleted successfully`
                })
            } else {
                res.send({
                    message: "No item was deleted"
                })
            }
        } catch (err) {
            res.status(500).send({
                message: "Error when deleting all items: " + err
            })
        }
    }
}