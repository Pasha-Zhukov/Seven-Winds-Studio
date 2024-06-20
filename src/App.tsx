import SideMenu from "./components/SideMenu";
import MainContent from "./MainContent";
import Menu from "./components/Menu";
import SubMenu from "./components/SubMenu";

import "./App.css";

function App() {
  const menuItems = ["По проекту", "Объекты", "РД", "График"];
  return (
    <>
      <Menu />
      <SubMenu />
      <div className="body-content">
        <div className="side-menu-wrapper">
          <SideMenu items={menuItems} />
        </div>
        <MainContent />
      </div>
    </>
  );
}

export default App;
