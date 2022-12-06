import React, { useState, useEffect, Component } from "react";

import { useParams, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

import Axios from "axios";
import "../../asset/common/Style.css";
import config from "../config/Config";
const PATH = config().path + "/product";

function Cart() {
  let id = 14;
  const [items, setItems] = useState([]);
  const [total, setPrice] = useState(0);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("mycart")) {
      let totalPrice = 0;
      let num = 0;
      const list = JSON.parse(localStorage.getItem("mycart")).items;
      list.forEach((item) => {
        totalPrice += parseInt(item.product.price) * parseInt(item.quantity);
        num += parseInt(item.quantity);
      });
      setNumber(num);
      setItems(list);
      setPrice(totalPrice);
    }
  }, []);

  const btn_delete = (pid) => {
    const obj = JSON.parse(localStorage.getItem("mycart"));
    const list = obj.items;
    const rsList = [];
    let isEpt = true;

    list.forEach((item, i) => {
      if (item.product.pid != pid) {
        rsList.push(item);
        isEpt = false;
      }
    });

    if (isEpt) {
      localStorage.setItem("mycart", "");
    } else {
      obj.items = rsList;
      localStorage.setItem("mycart", JSON.stringify(obj));
    }

    window.location.reload();
  };

  const btn_update = (pid, ctl) => {
    if (parseInt(ctl.value) < 1) {
      ctl.value = 1;
      return;
    }

    const obj = JSON.parse(localStorage.getItem("mycart"));
    const list = obj.items;

    list.forEach((item, i) => {
      if (item.product.pid == pid) {
        item.quantity = ctl.value;
      }
    });

    localStorage.setItem("mycart", JSON.stringify(obj));

    window.location.reload();
  };

  if (number == 0) {
    return (
      <>
        {" "}
        <br />
        <div className="container">
          {" "}
          <h1>Your cart is empty. </h1>{" "}
        </div>{" "}
      </>
    );
  }

  return (
    <>
      <div className="container container-fluid">
        <h3 className="mt-5">
          Your Cart: <b>{number} items</b>
        </h3>
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {items.map((item) => (
              <>
                <hr />
                <div className="cart-item">
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          `/images/${item.product.img}.jpg`
                        }
                        alt="Laptop"
                        height="90"
                        width="115"
                      />
                    </div>
                    <div className="col-4 col-lg-3">
                      <p>{item.product.description}</p>
                    </div>

                    <div className="col-4 col-lg-2 mt-0 mt-lg-0">
                      <p id="card_item_price">${item.product.price}</p>
                    </div>

                    <div className="col-4 col-lg-2 mt-0 mt-lg-0 item_counter">
                      <div className="">
                        <input
                          type="number"
                          className="form-control counter d-inline"
                          defaultValue={item.quantity}
                          onChange={(e) =>
                            btn_update(item.product.pid, e.target)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-4 col-lg-2 mt-0 mt-lg-0">
                      <button
                        id="delete_cart_item"
                        onClick={() => btn_delete(item.product.pid)}
                      >
                        {" "}
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            ))}
          </div>
          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:
                <span className="order-summary-values">${total}</span>
              </p>
              <p>
                Est. total:
                <span className="order-summary-values">
                  ${Math.round(total * 115) / 100}
                </span>
              </p>
              <hr />
              {!sessionStorage.getItem("token") ||
              sessionStorage.getItem("token") == "null" ? (
                <Link
                  to="/login"
                  className="btn btn-primary btn-block"
                  id="checkout_btn"
                >
                  Login and Check out
                </Link>
              ) : (
                <Link
                  to="/shipping"
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                >
                  Check out
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
