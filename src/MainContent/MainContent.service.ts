import { item } from "../shared/interfaces/item.interface";

export default function createRowLocal(
  id: number,
  parentArray: item[],
  dispatch: any,
  dataList: any,
  disableButton: any
) {
  if (!id) {
    dispatch(disableButton(true));
    dispatch(
      dataList([
        {
          equipmentCosts: 0,
          estimatedProfit: 0,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          overheads: 0,
          parentId: null,
          rowName: "",
          salary: 0,
          supportCosts: 0,
          isEditing: true,
          id: 1,
        },
      ])
    );
  } else {
    const updateParentArray = (dataArray: item[]): item[] => {
      return dataArray?.map((dataItem) => {
        if (dataItem.id === id) {
          const newChildItem: item = {
            id: dataItem.child.length + 1,
            rowName: "",
            total: 0,
            salary: 0,
            mimExploitation: 0,
            machineOperatorSalary: 0,
            materials: 0,
            mainCosts: 0,
            supportCosts: 0,
            equipmentCosts: 0,
            overheads: 0,
            estimatedProfit: 0,
            child: [],
            isEditing: true,
            idParent: id,
          };

          return {
            ...dataItem,
            child: [...dataItem.child, newChildItem],
          };
        } else if (dataItem.child && dataItem.child.length > 0) {
          return {
            ...dataItem,
            child: updateParentArray(dataItem.child),
          };
        }

        return dataItem;
      });
    };

    const updatedDataArray = updateParentArray(parentArray);

    dispatch(dataList(updatedDataArray));
  }
}
