import React, { useState } from "react";
import { item } from "../../shared/interfaces/item.interface";
import { ChildMainContentProps } from ".";

import ChildMainContentItem from "../ChildMainContentItem";
import ChildMainContentButtonGroup from "../ChildMainContentButtonGroup";

const ChildMainContent: React.FC<ChildMainContentProps> = ({
  item,
  nestingLevel,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <>
      <tbody>
        <tr>
          <td className="line-item">
            <div key={item.id} style={{ marginLeft: `${nestingLevel * 20}px` }}>
              <ChildMainContentButtonGroup itemId={item.id} />
            </div>
          </td>
          <ChildMainContentItem
            item={item}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
          />
        </tr>
      </tbody>
      {item.child?.length > 0 &&
        item.child.map((childItem: item) => (
          <ChildMainContent
            key={childItem.id}
            item={childItem}
            nestingLevel={nestingLevel + 1}
          />
        ))}
    </>
  );
};

export default ChildMainContent;
