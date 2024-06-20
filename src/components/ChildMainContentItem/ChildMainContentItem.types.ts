import { item } from "../../shared/interfaces/item.interface";

export interface ChildMainContentItemProps {
  item: item;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}
