import React, { useState, useEffect } from "react";
import Axios from "axios"; // used to call API
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRemove, faAdd } from "@fortawesome/free-solid-svg-icons";
import ForbiddenPage from "../../components/common/ForbiddenPage"
import Adminbar from "./Adminbar";
import config from "../config/Config";
const PATH = config().path;

function UserList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    if( sessionStorage.getItem("token")) {
      Axios.get(PATH + "/login/user",{headers:{token: sessionStorage.getItem("token")}}).then((response) => {
        setList(response.data);
      });
    }
  }, []);

  if( !sessionStorage.getItem("token") || sessionStorage.getItem("token") == "" || sessionStorage.getItem("token") == "null" || sessionStorage.getItem("token") == null) {
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
                    <th>User Email</th>
                    <th>Role</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item, key) => (
                    <tr key={item.uid}>
                      <td>{item.uid}</td>
                      <td>{item.uemail}</td>
                      <td>{item.role ? "admin" : "user"}</td>
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

export default UserList;
