import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disableButton } from "../../Redux/appStateSlice";
import { ChildMainContentItemProps } from ".";
import { AppState } from "../../Redux/redux.types";

import {
  useCreateRowMutation,
  useFetchEntityDataQuery,
  useUpdateRowMutation,
} from "../../Redux/api";

const ChildMainContentItem: React.FC<ChildMainContentItemProps> = ({
  item,
  setIsEditing,
  isEditing,
}) => {
  const [editedRowName, setEditedRowName] = useState<string>(item.rowName);
  const [editedSalary, setEditedSalary] = useState<number>(item.salary);
  const [editedEquipmentCosts, setEditedEquipmentCosts] = useState<number>(
    item.equipmentCosts
  );
  const [editedOverheads, setEditedOverheads] = useState<number>(
    item.overheads
  );
  const [editedEstimatedProfit, setEditedEstimatedProfit] = useState<number>(
    item.estimatedProfit
  );
  const [updateRow, { isSuccess: isSuccessUpdate }] = useUpdateRowMutation();
  const [createRow, { isSuccess: isSuccessDCreate }] = useCreateRowMutation();
  const { refetch } = useFetchEntityDataQuery(null);

  const dispatch = useDispatch();

  const handleDoubleClick = () => {
    setIsEditing(true);
    dispatch(disableButton(true));
  };

  useEffect(() => {
    if (isSuccessDCreate || isSuccessUpdate) {
      refetch();
    }
  }, [isSuccessDCreate, isSuccessUpdate]);

  const allData = useSelector(
    (state: { appState: AppState }) => state.appState.dataList
  );

  useEffect(() => {
    setEditedRowName(item.rowName);
    setEditedSalary(item.salary);
    setEditedEquipmentCosts(item.equipmentCosts);
    setEditedOverheads(item.overheads);
    setEditedEstimatedProfit(item.estimatedProfit);
  }, [allData]);

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditedRowName(item.rowName);
      if (item.id > 100) {
        setIsEditing(false);
        dispatch(disableButton(true));
        updateRow({
          updatedData: {
            equipmentCosts: editedEquipmentCosts,
            estimatedProfit: editedEstimatedProfit,
            machineOperatorSalary: 0,
            mainCosts: 0,
            materials: 0,
            mimExploitation: 0,
            overheads: editedOverheads,
            rowName: editedRowName,
            salary: editedSalary,
            supportCosts: 0,
          },
          rID: item.id,
        });
      } else {
        createRow({
          data: {
            equipmentCosts: editedEquipmentCosts,
            estimatedProfit: editedEstimatedProfit,
            machineOperatorSalary: 0,
            mainCosts: 0,
            materials: 0,
            parentId: item.idParent,
            mimExploitation: 0,
            overheads: editedOverheads,
            rowName: editedRowName,
            salary: editedSalary,
            supportCosts: 0,
          },
        });
      }
      setIsEditing(false);
      dispatch(disableButton(false));
    }
  };
  return (
    <>
      <td onDoubleClick={handleDoubleClick} className="line-item">
        {isEditing || item.isEditing ? (
          <input
            className="input-row"
            type="text"
            value={editedRowName}
            onChange={(e) => setEditedRowName(e.target.value)}
            onKeyDown={handleInputKeyPress}
          />
        ) : (
          item.rowName
        )}
      </td>
      <td onDoubleClick={handleDoubleClick} className="line-item">
        {isEditing || item.isEditing ? (
          <input
            className="input-row"
            type="text"
            value={editedSalary}
            onChange={(e) => {
              setEditedSalary(+e.target.value.replace(/\D/g, ""));
            }}
            onKeyDown={handleInputKeyPress}
          />
        ) : (
          item.salary
        )}
      </td>
      <td onDoubleClick={handleDoubleClick} className="line-item">
        {isEditing || item.isEditing ? (
          <input
            className="input-row"
            type="text"
            value={editedEquipmentCosts}
            onChange={(e) => {
              setEditedEquipmentCosts(+e.target.value.replace(/\D/g, ""));
            }}
            onKeyDown={handleInputKeyPress}
          />
        ) : (
          item.equipmentCosts
        )}
      </td>
      <td onDoubleClick={handleDoubleClick} className="line-item">
        {isEditing || item.isEditing ? (
          <input
            className="input-row"
            type="text"
            value={editedOverheads}
            onChange={(e) => {
              setEditedOverheads(+e.target.value.replace(/\D/g, ""));
            }}
            onKeyDown={handleInputKeyPress}
          />
        ) : (
          item.overheads
        )}
      </td>
      <td onDoubleClick={handleDoubleClick} className="line-item">
        {isEditing || item.isEditing ? (
          <input
            className="input-row"
            type="text"
            value={editedEstimatedProfit}
            onChange={(e) => {
              setEditedEstimatedProfit(+e.target.value.replace(/\D/g, ""));
            }}
            onKeyDown={handleInputKeyPress}
          />
        ) : (
          item.estimatedProfit
        )}
      </td>
    </>
  );
};

export default ChildMainContentItem;
