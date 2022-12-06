import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [keyWord, setKeyWord] = useState("");
  const [orderNum, setOrderNum] = useState(0);
  const [uemail, setUemail] = useState("");

  useEffect(() => {
    if (
      localStorage.getItem("mycart") &&
      localStorage.getItem("mycart") != "null"
    ) {
      const myCart = JSON.parse(localStorage.getItem("mycart"));
      let num = 0;
      myCart.items.forEach((item) => {
        num += parseInt(item.quantity);
      });
      //setOrderNum( myCart.items.length)
      setOrderNum(num);
    }

    if (
      sessionStorage.getItem("token") &&
      sessionStorage.getItem("token") != "null"
    ) {
      const obj = JSON.parse(sessionStorage.getItem("token"));
      const email = obj.user.uemail;
      setUemail(email);
    }
  });

  const btn_logoff = () => {
    sessionStorage.setItem("token", "null");
    window.location.replace("/");
  };

  return (
    <div>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand mx-3">
            <a href="/">
              <img
                src={process.env.PUBLIC_URL + "/images/logo2.png"}
                className="img-fluid logo"
              />
            </a>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              className="form-control"
              placeholder="Enter Product Name ..."
              onChange={(e) => {
                setKeyWord(e.target.value);
              }}
            />
            <div className="input-group-append">
              <a
                id="search_btn"
                className="btn"
                href={keyWord.trim() == "" ? "/" : `/product/name/${keyWord}`}
              >
                <FontAwesomeIcon icon={faSearch} />
              </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 rightheader">
          <Link to="/shopping/cart" className="btn">
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              {orderNum}
            </span>
          </Link>

          {/* Ngan added for testing admin page */}

          {uemail ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>{uemail}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {JSON.parse(sessionStorage.getItem("token")).user.role.charAt(
                  JSON.parse(sessionStorage.getItem("token")).user.role.length -
                    1
                ) == "1" ? (
                  <>
                    <Link className="dropdown-item" to="/admin">                    
                      Admin
                    </Link>
                  </>
                ) : (
                  <>
                    <Link className="dropdown-item" to="/user">                     
                      My order
                    </Link>
                  </>
                )}

                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={btn_logoff}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn ml-4" id="login_btn">
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
