
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div>
      <Navbar /> {/* Always shown */}
      <div style={{ paddingTop: "60px" }}>
        <Outlet /> {/* Render nested route (dashboard or analytics) */}
      </div>
    </div>
  );
};

export default ProtectedLayout;
