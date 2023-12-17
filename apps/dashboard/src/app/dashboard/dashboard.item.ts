import { Item } from "../item";

export interface DashboardItem extends Item {
    isSelected: boolean;
}