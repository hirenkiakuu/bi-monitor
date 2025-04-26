import cls from "./ActiveTab.module.scss";
import { Outlet } from "react-router-dom";

const ActiveTab = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ActiveTab;
