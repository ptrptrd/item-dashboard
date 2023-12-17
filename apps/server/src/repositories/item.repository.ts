import { Op } from "sequelize";
import Item from "../models/item.model";

interface IItemRepository {
    save(item: Item): Promise<Item>;
    retrieveAll(searchParams: {name: string}): Promise<Item[]>;
    retrieveById(itemId: number): Promise<Item | null>;
    update(item: Item): Promise<number>;
    delete(itemId: number): Promise<number>;
    deleteAll(): Promise<number>;
}

interface SearchCondition {
    [key: string]: unknown;
}

class ItemRepository implements IItemRepository {
    async save(item: Item): Promise<Item> {
        try {
            return await Item.create({
                name: item.name,
                location: item.location,
                type: item.type
            });
        } catch (err) {
            throw new Error("Failed to create a new item: " + err);
        }
    }

    async retrieveAll(searchParams: { name?: string }): Promise<Item[]> {
        try {
            const condition: SearchCondition = {}

            if (searchParams?.name) 
                condition.name = { [Op.iLike]: `%${searchParams.name}%`}

            return await Item.findAll({where: condition});
        } catch (err) {
            throw new Error("Failed to retrieve all items: " + err)
        }
    }

    async retrieveById(itemId: number): Promise<Item> {
        try {
            return await Item.findByPk(itemId);
        } catch (err) {
            throw new Error("Failed to retrieve item with id " + itemId + ": " + err);
        }
    }

    async update(item: Item): Promise<number> {
        const { id, name, type, location } = item;

        try {
            const affectedRows = await Item.update(
                {name, type, location}, 
                {where: {id: id}}
            );

            return affectedRows[0]
        } catch (err) {
            throw new Error("Failed to update item with id " + id + ": " + err);
        }
    }

    async delete(itemId: number): Promise<number> {
        try {
            const affectedRow = await Item.destroy({where: {id: itemId}});

            return affectedRow;
        } catch (err) {
            throw new Error("Failed to delete item with id" + itemId + ": " + err);
        }
    }

    async deleteAll(): Promise<number> {
        try {
            const affectedRow = await Item.destroy({
                where: {},
                truncate: false
            });

            return affectedRow;
        } catch (err) {
            throw new Error("Failed to delete all items: " + err);
        }
    }
}

export default new ItemRepository();