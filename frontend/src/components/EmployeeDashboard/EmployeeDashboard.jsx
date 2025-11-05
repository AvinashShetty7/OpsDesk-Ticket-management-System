import React, { useState, useEffect } from "react";
import CreateTicket from "./CreateTicket";
import MyTickets from "./MyTickets";
import { Link } from "react-router-dom";
import EmpSidebar from "./EmpSidebar";
import { Outlet } from "react-router-dom";
export default function EmployeeDashboard() {

  return (
    <div  className="sideb">
      <EmpSidebar/>
      <Outlet/>
    </div>
  );
}
