import React, { useState } from "react";
import createStore from "../../store/state";
import { Navigate, Outlet } from "react-router-dom";
import LoginNav from "../../components/LoginNav";
import { setAuthToken } from "../../libs/apiCall";
import DashboardHeader from "../../components/DashboardHeader";

import "../../style/admin.css";

export default function AdminLayout() {
  const [navActive, setNavActive] = useState(true);

  const { user, adTheme } = createStore((state) => state);

  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  setAuthToken(user?.token || "");

  return !user ? (
    <Navigate to="/" replace={true} />
  ) : (
    <div className={`dashboard-bg ${adTheme}`}>
      <DashboardHeader navActive={navActive} setNavActive={setNavActive} />
      {!navActive && (
        <div className="whole-screen" onClick={() => setNavActive(true)}></div>
      )}
      <div className={`navbars ${!navActive && "hidden"}`}>
        <LoginNav setNavActive={setNavActive} />
      </div>
      <div className={`content-box ${!navActive && "full-show"}`}>
        <div className="manage-dashboard">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
