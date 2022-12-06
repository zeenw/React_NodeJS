import React, { useState, useEffect, Component } from "react";
import { Button, Card, Alert, Nav, variant, Form } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Axios from "axios";
import StepCheckout from "../common/StepCheckout";

import "../../asset/common/Style.css";
import config from "../config/Config";
import ForbiddenPage from "../../components/common/ForbiddenPage"
const PATH = config().path + "/login/user";

function Checkout() {
  const [add1, setAdd1] = useState("");
  const [add2, setAdd2] = useState("");
  const [phone1, setPhone1] = useState("");
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    if(sessionStorage.getItem("token")) {
      Axios.get(PATH + "/" + JSON.parse(sessionStorage.getItem("token")).user.uid,{headers:{token: sessionStorage.getItem("token")}}).then((rs) => {
        setAdd1(rs.data.add1)
        setAdd2(rs.data.add2)
        setPhone1(rs.data.phone1)
      });
    }
  }, []);

  if( !sessionStorage.getItem("token") || sessionStorage.getItem("token") == "" || sessionStorage.getItem("token") == "null" || sessionStorage.getItem("token") == null) {
    return <> <ForbiddenPage /></>
  } 

  const updateUserInfo = ()=>{
    if (isVerified()) {
      Axios.put(PATH + "/updateUserInfo", {
        uid: JSON.parse(sessionStorage.getItem("token")).user.uid,
        add1: add1,
        add2: add2,
        phone1: phone1
      }, {headers:{token: sessionStorage.getItem("token")}}).then((rs) => {
        window.location.replace("/order")
      });
    }

    const objCart = JSON.parse(localStorage.getItem("mycart"))
    objCart.address = add1
    objCart.city = add2
    objCart.phone1 = phone1
    localStorage.setItem("mycart",JSON.stringify(objCart))
  }
  
  function isVerified() {
    var rs = true;
    setMsg([]);
    if (add1 == "") {
      setMsg((msg) => [...msg, "Confirm your address please."]);
      rs = false;
    }

    if (add2 == "") {
      setMsg((msg) => [...msg, "Confirm your city please."]);
      rs = false;
    }

    if (phone1 == "") {
      setMsg((msg) => [...msg, "Confirm your phone number please."]);
      rs = false;
    }

    return rs;
  }

  return (
    <>
      <div className="step">
        <StepCheckout step1></StepCheckout>
      </div>

      <div className="row wrapper">
        <div className="col-10 col-lg-4">
          <form className="shadow-lg">
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label for="address_field">Address</label>
              <input
                type="text"
                defaultValue={add1}
                id="address_field"
                name="add1"
                className="form-control"
                required
                onChange={(e) => {
                  setAdd1(e.target.value);
                  const obj = JSON.parse(localStorage.getItem("mycart"))
                  obj.address = e.target.value
                  localStorage.setItem("mycart", JSON.stringify(obj))
                }}
              />
            </div>

            <div className="form-group">
              <label for="city_field">City</label>
              <input
                defaultValue={add2}
                type="text"
                id="city_field"
                name="add2"
                className="form-control"
                required
                onChange={(e) => {
                  setAdd2(e.target.value);
                  const obj = JSON.parse(localStorage.getItem("mycart"))
                  obj.city = e.target.value
                  localStorage.setItem("mycart", JSON.stringify(obj))
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                defaultValue={phone1}
                type="number"
                id="phone_field"
                name="phone1"
                className="form-control"
                required
                placeholder="1112223333"
                onChange={(e) => {
                  setPhone1(e.target.value);
                  const obj = JSON.parse(localStorage.getItem("mycart"))
                  obj.phone = e.target.value
                  localStorage.setItem("mycart", JSON.stringify(obj))
                }}
              />
            </div>
            { (msg) ? msg.map( i => (    

            <Alert> <li>{ i }</li> </Alert> 

            )) : null }
            <Button id="shipping_btn" className="btn btn-block py-3" type="button" onClick={ updateUserInfo }>
              CONTINUE
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Checkout;
