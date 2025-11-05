import React, { useState, useEffect } from "react";
import Techsidebar from "./Techsidebar";
import { Outlet } from "react-router-dom";

export default function TechnicianDashboard() {
  
  return (
    <div className="sideb">
      <Techsidebar />
      <Outlet/>
    </div>
  );
}
