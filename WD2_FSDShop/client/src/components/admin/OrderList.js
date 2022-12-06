import React, { useState, useEffect } from "react";
import Axios from "axios"; // used to call API
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRemove, faAdd } from "@fortawesome/free-solid-svg-icons";

import Adminbar from "./Adminbar";
import config from "../config/Config";
import ForbiddenPage from "../../components/common/ForbiddenPage"
const PATH = config().path;

function OrderList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    Axios.get(PATH + "/order",{headers:{token: sessionStorage.getItem("token")}}).then((response) => {
      setList(response.data);
    });
  }, []);

  if( !sessionStorage.getItem("token") || (JSON.parse(sessionStorage.getItem("token")).user.role).charAt(JSON.parse(sessionStorage.getItem("token")).user.role.length - 1) != "1") {
    return <> <ForbiddenPage /></>
  }

  return (
    <>
      <Adminbar />
      <div className="admin_container">
        <div className="admin_wrapper">
          <div className="adminadditem">
            {/* <Link to="/product/admin/add" className="btn">
              <FontAwesomeIcon icon={faAdd} className="adminicon" /> Add
            </Link> */}
          </div>
          <div className="row">
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User ID</th>
                    <th>Status</th>
                    <th>Order Date</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item, key) => (
                    <tr key={item.oid}>
                      <td>{item.oid}</td>
                      <td>{item.uid}</td>
                      <td>{item.status ? "Received": "In processing"}</td>
                      <td>{item.odate.substring(0, 10)}</td>
                      <td>
                        <Link to={`/product/admin/edit/${item.id}`}>
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="adminicon"
                          />
                        </Link>
                        <Link to={`/product/admin/delete/${item.id}`}>
                          <FontAwesomeIcon
                            icon={faRemove}
                            className="adminicon"
                          />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderList;
