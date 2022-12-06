import React, { useState, useEffect } from "react";
import Axios from "axios"; // used to call API
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRemove, faAdd } from "@fortawesome/free-solid-svg-icons";
import ForbiddenPage from "../../components/common/ForbiddenPage"
import Adminbar from "./Adminbar";
import config from "../config/Config";
const PATH = config().path;

function ProductsList() {
  const [ProductList, setProductList] = useState([]);

  useEffect(() => {
    Axios.get(PATH + "/product").then((response) => {
      setProductList(response.data);
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
                    <th>Product ID</th>
                    <th>Category ID</th>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Rate</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ProductList.map((item, key) => (
                    <tr key={item.pid}>
                      <td>{item.pid}</td>
                      <td>{item.cid}</td>
                      <td>{item.uid}</td>
                      <td>{item.pname}</td>
                      <td>{item.price}</td>
                      <td>{item.description}</td>
                      <td>{item.img}</td>
                      <td>{item.rate}</td>
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

export default ProductsList;
