import React, { useState, useEffect, Component } from "react";

import { useParams, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import StepCheckout from "../common/StepCheckout";
import Axios from "axios";
import ForbiddenPage from "../../components/common/ForbiddenPage"
import "../../asset/common/Style.css";

function isVerified() {
  var rs = true;
  // setMsg([]);
  // if (add1 == "") {
  //   setMsg((msg) => [...msg, "Confirm your address please."]);
  //   rs = false;
  // }

  // if (add2 == "") {
  //   setMsg((msg) => [...msg, "Confirm your city please."]);
  //   rs = false;
  // }

  // if (phone1 == "") {
  //   setMsg((msg) => [...msg, "Confirm your phone number please."]);
  //   rs = false;
  // }

  return rs;
}

const btn_payment=()=>{
  if(isVerified) {
    localStorage.removeItem("mycart")
    alert("Successful payment.")
    window.location.replace("/")
  }
  
}

function Checkout() {
  if( !sessionStorage.getItem("token") || sessionStorage.getItem("token") == "" || sessionStorage.getItem("token") == "null" || sessionStorage.getItem("token") == null) {
    return <> <ForbiddenPage /></>
  } 
  
  return (
    <>
      <div className="step">
        <StepCheckout step1 step2 step3></StepCheckout>
      </div>
      <div className="row wrapper">
        <div className="col-10 col-lg-3">
          <form className="shadow-lg">
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label for="card_num_field">Card Number</label>
              <input
                type="text"
                id="card_num_field"
                className="form-control"
                defaultValue=""
              />
            </div>

            <div className="form-group">
              <label for="card_exp_field">Date Expiry</label>
              <input
                type="text"
                id="card_exp_field"
                className="form-control"
                defaultvalue=""
                placeholder="MM/YY"
              />
            </div>

            <div className="form-group">
              <label for="card_cvc_field">CVC</label>
              <input
                type="text"
                id="card_cvc_field"
                className="form-control"
                defaultvalue=""
              />
            </div>

            <button className="btn btn-block py-3" type="button" onClick={btn_payment}>
              Pay
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Checkout;
