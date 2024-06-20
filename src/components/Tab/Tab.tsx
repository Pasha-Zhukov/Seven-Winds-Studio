import React from "react";
import "./Tab.style.scss";
import { TabProps } from ".";

const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className="tab-content">{children}</div>;
};

export default Tab;
