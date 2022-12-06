import React, { useState, useEffect, Component } from "react";
import {
  Button,
  Card,
  Alert,
  Nav,
  variant,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import {
  Route,
  Routes,
  Link,
  Redirect,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import Validator from "validator";
import Axios from "axios";

import "../../asset/common/Style.css";
import config from "../config/Config";
import Adminbar from "../../components/admin/Adminbar"
import Userbar from "../login/Userbar"

function Login() {
  const PATH = config().path;
  const [uemail, setUserEmail] = useState("");
  const [pword, setPassword] = useState("");
  const [msg, setMsg] = useState("", [])

  const btn_login = () => {
    if(verify()){
      Axios.post(PATH + "/login", {
        uemail: uemail,
        pword: pword,
      }).then((rs) => {
        const obj = rs.data;
        if (obj.isAuth == 1) {
          obj.isAuth = config().auth;
          if(obj.user.role == 1) {
            obj.user.role = config().admin
          } else {
            obj.user.role = config().user;
          }
          sessionStorage.setItem("token", JSON.stringify(obj));
          //alert("Welcome.");
          window.location.reload();
        } else {
          alert("Incorrect username or password.");
        }
      });
    }
    
  };

  function verify() {
    var rs = true
    setMsg([])
    if(!Validator.isEmail(uemail)) {
      setMsg(msg => [...msg, "Check your email please."])
      rs = false
    }

    if(pword == ""){
      setMsg(msg => [...msg, "Check your password not empty and lengh between 6 to 20 characters please."])
      rs = false
    }
    return rs
  }

  const btn_logoff = () => {
    sessionStorage.setItem("token", null);
    window.location.replace("/");
  };

  const objToken = JSON.parse(sessionStorage.getItem("token"));
  if (objToken && objToken.user.role.charAt(objToken.isAuth.length - 1) == "1") {
    return (
      <Adminbar />
    );
  } else if (objToken && objToken.user.role.charAt(objToken.isAuth.length - 1) == "0") {
    if(localStorage.getItem("mycart") && JSON.parse(localStorage.getItem("mycart")) && JSON.parse(localStorage.getItem("mycart")).uemail != objToken.user.uemail && JSON.parse(localStorage.getItem("mycart")).uemail!=""){
      localStorage.removeItem("mycart")
    }

    if(localStorage.getItem("mycart")){
      const objCart = JSON.parse(localStorage.getItem("mycart"))
      objCart.uemail = JSON.parse(sessionStorage.getItem("token")).user.uemail
      localStorage.setItem("mycart", JSON.stringify(objCart))
    }

    
    return (
      <Userbar />
    );
  } else {
    return (
      <>
        <div className="container container-fluid">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg">
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label for="email_field">Email</label>
                  <input
                    type="email"
                    name="uemail"
                    size="20"
                    maxLength="30"
                    id="uemail"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label for="password_field">Password</label>
                  <input
                    type="password"
                    name="pword"
                    size="20"
                    maxLength="12"
                    id="pword"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <button type="button"
                  id="login_button"
                  className="btn btn-block py-3"
                  onClick={btn_login}
                >
                  LOGIN
                </button>
                <div className="registerlink">
                <Link to="/registration">New User?</Link>             
                </div>         
                <div>
                { (msg) ? msg.map( i => (    

                <Alert> <li>{ i }</li> </Alert> 

                )) : null }    
                </div>   
              </form>
            </div>
          </div>
        </div>
      </>
    ); // return close
  }
} // class close

export default Login;
