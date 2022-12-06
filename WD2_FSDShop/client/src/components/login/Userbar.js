import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileEdit,
  faComputerMouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ErrPage from "../common/ErrPage"

function Userbar() {
  if( !sessionStorage.getItem("token") || (JSON.parse(sessionStorage.getItem("token")).user.role).charAt(JSON.parse(sessionStorage.getItem("token")).user.role.length - 1) != "0") {
    return <> <ErrPage /></>
  }
  return (
    <div className="admin_container">
      <h1 className="admintitle">Welcome to FSD SHOP</h1>
      <div className="adminbar">
        <div className="adminitem">
          <Link to="/login/products" className="btn">
            <FontAwesomeIcon icon={faComputerMouse} /> Your Products on sale
          </Link>
        </div>
        <div className="adminitem">
          <Link to="/login/orders" className="btn">
            <FontAwesomeIcon icon={faFileEdit} /> Your Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Userbar;
