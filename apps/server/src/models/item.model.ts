import { Model, Column, DataType, Table } from "sequelize-typescript";

@Table({
    tableName: "items",
    timestamps: false
})
export default class Item extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
      })
    id?: number;

    @Column({
        type: DataType.STRING(255), 
        field: "name"
    })
    name?: string;

    @Column({
        type: DataType.STRING(255),
        field: "location"
    })
    location?: string;

    @Column({
        type: DataType.STRING(255),
        field: "type"
    })
    type?: string;
}