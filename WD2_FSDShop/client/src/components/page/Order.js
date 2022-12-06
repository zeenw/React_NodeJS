import React, { useState, useEffect, Component } from "react";

import { useParams, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import StepCheckout from "../common/StepCheckout";
import Axios from "axios";
import "../../asset/common/Style.css";
import config from "../config/Config";
import ForbiddenPage from "../../components/common/ForbiddenPage"
const PATH = config().path + "/order";

function Checkout() {
  const [product, setProduct] = useState([]);
  const [total, setPrice] = useState(0);
  const [number, setNumber] = useState(0);
  const [items, setItems] = useState([]);
  const [uid, setUid] = useState(0);

  useEffect(() => {
    if(localStorage.getItem("mycart")) {
      let totalPrice = 0
      let num = 0
      const list = JSON.parse(localStorage.getItem("mycart")).items
      list.forEach((item)=>{
        totalPrice += parseInt(item.product.price) * parseInt(item.quantity)
        num += parseInt(item.quantity)
      })
      setNumber(num)
      setPrice(totalPrice)
      setItems(JSON.parse(localStorage.getItem("mycart")).items)
    }
    
    if(sessionStorage.getItem("token")) {
      setUid(JSON.parse(sessionStorage.getItem("token")).user.uid)
    } 
    
  }, []);

  const btn_payment = ()=>{
    Axios.post(PATH + "/", {
      uid: uid,
      status: 0,
      items: items
    }, {headers:{token: sessionStorage.getItem("token")}}).then((rs) => {
      window.location.replace("/payment")
    });
    
  }

  if( !sessionStorage.getItem("token") || sessionStorage.getItem("token") == "" || sessionStorage.getItem("token") == "null" || sessionStorage.getItem("token") == null) {
    return <> <ForbiddenPage /></>
  } 

  return (
    <>
      <div className="step">
        <StepCheckout step1 step2></StepCheckout>
      </div>
      <div className="container container-fluid">       
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-confirm">
            <h4 className="mb-3">Shipping Info</h4>
            <p>
              <b>Email:</b> {JSON.parse(localStorage.getItem("mycart")).uemail}
            </p>
            <p>
              <b>Phone:</b> {JSON.parse(localStorage.getItem("mycart")).phone1}
            </p>
            <p className="mb-4">
              <b>Address:</b> {JSON.parse(localStorage.getItem("mycart")).address}
            </p>

            <hr />
            <h4 className="mt-4">Your Cart Items:</h4>
            {JSON.parse(localStorage.getItem("mycart")).items.map((item, key) => (<>
            <hr />
            <div className="cart-item my-1">
              <div className="row">
                <div className="col-4 col-lg-2">
                  <img
                    src={process.env.PUBLIC_URL + `/images/${item.product.img}.jpg`}
                    alt="Laptop"
                    height="45"
                    width="65"
                  />
                </div>

                <div className="col-4 col-lg-6">
                  <p>{item.product.description}</p>
                </div>

                <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                  <p>
                    {item.quantity} x ${item.product.price} = <b>${ item.product.price * item.quantity }</b>
                  </p>
                </div>
              </div>
            </div>
            </>))}
            <hr />
          </div>

          <div className="col-12 col-lg-3 my-2">
            <div id="order_summary">
              <h4>Order Summary</h4> <hr />
              <p>
                Subtotal: <span className="order-summary-values">${total}</span>
              </p>
              <p>
                Shipping: <span className="order-summary-values">Free</span>
              </p>
              <p>
                Tax: <span className="order-summary-values">${ Math.round(Math.round(total*0.15)) }</span>
              </p>{" "}
              <hr />
              <p>
                Total: <span className="order-summary-values">${Math.round(total*115)/100}</span>
              </p>{" "}
              <hr />
              <button
                to="/payment"
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={btn_payment}
              >
                Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
