import { NavLink } from "react-router-dom";
import cls from "./TabToggle.module.scss";

const TabToggle = () => {
  return (
    <div className={cls["tab-toggle"]}>
      <NavLink
        className={({ isActive }) =>
          isActive ? cls["link--active"] : cls["link"]
        }
        to="/metrics"
      >
        Дэшборды
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? cls["link--active"] : cls["link"]
        }
        to="/edit"
      >
        Данные
      </NavLink>
    </div>
  );
};

export default TabToggle;
