import cls from "./Dashboard.module.scss";
import Header from "../widgets/Header/Header";
import Sidebar from "../widgets/Sidebar/Sidebar";
import ActiveTab from "./Activetab/Activetab";
import TabToggle from "../features/TabToggle/TabToggle";
import { createContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";

// FileContext.tsx
export const FileContext = createContext({
  uploaded: false,
  setUploaded: () => {},
});

const Dashboard = () => {
  const [uploaded, setUploaded] = useState(false);

  return (
    <FileContext.Provider value={{ uploaded, setUploaded }}>
      <div style={{ minHeight: "100%" }}>
        <Header />
        <div className={cls["dashboard-container"]}>
          <Sidebar />
          <div className={cls["content-container"]}>
            {/* <Outlet /> */}
            <TabToggle />
            <ActiveTab />
          </div>
        </div>
      </div>
    </FileContext.Provider>
  );
};

export default Dashboard;
