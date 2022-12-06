import React, { useState, useEffect, useRef } from "react";
//import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Adminbar from "./Adminbar";
import ErrPage from "../../components/common/ErrPage"
import ForbiddenPage from "../../components/common/ForbiddenPage"
import config from "../config/Config";
const PATH = config().path;

function AddProduct() {
  const [categories, setCategories] = useState([]);

  const name = useRef("");
  // const price = useRef(0);
  // const description = useRef("");
  const rating = useRef(0);
  const category = useRef(0);
  const user = useRef(0);
  const image = useRef("");

  // Zeen add parameters
  const [cid, setCid] = useState(1);
  const [pname, setPname] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState(0);
  const [img, setImg] = useState("");
  const [uid, setUid] = useState(0);


  useEffect(() => {
    Axios.get(PATH + "/category/").then((response) => {
      setCategories(response.data);
    });

    if( sessionStorage.getItem("token") && sessionStorage.getItem("token") != "" && sessionStorage.getItem("token") != "null" || sessionStorage.getItem("token") != null) {
      setUid(JSON.parse(sessionStorage.getItem("token")).user.uid) 
    } 
    
  }, []);

  const btn_create = ()=>{
    if (isVerified()) {
      Axios.post(PATH + "/product", {
        "cid" : cid,
        "uid": uid,
        "pname": pname,
        "price" : price,
        "description" : description,
        "img" : img,
        "rate" : rate
      }, {headers:{token: sessionStorage.getItem("token")}}).then((rs) => {
        alert("New product created.")
        window.location.replace("/login/products")
      });
    }
  }

  function isVerified(){
    return true
  }

  if( !sessionStorage.getItem("token") || sessionStorage.getItem("token") == "" || sessionStorage.getItem("token") == "null" || sessionStorage.getItem("token") == null) {
    return <> <ForbiddenPage /></>
  } 

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="wrapper my-5">
            <form
              className="shadow-lg"
              encType="multipart/form-data"
            >
              <h1 className="mb-4">New Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Product Name</label>
                <input
                  
                  type="text"
                  id="name_field"
                  className="form-control"
                  onChange={(e) => {
                    setPname(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  
                  type="number"
                  id="price_field"
                  className="form-control"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  
                  className="form-control"
                  id="description_field"
                  rows="3"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="rating_field">Rating</label>
                <input
                  
                  type="number"
                  id="rating_field"
                  className="form-control"
                  onChange={(e) => {
                    setRate(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select
                  
                  className="form-control"
                  id="category_field"
                  onChange={(e) => {
                    setCid(e.target.value);
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.cid}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="rating_field">Image</label>
                <input
                  
                  type="text"
                  id="image_field"
                  className="form-control"
                  onChange={(e) => {
                    setImg(e.target.value);
                  }}
                />
              </div>

              <button
                id="login_button"
                type="button"
                className="btn btn-block py-3"
                onClick={btn_create}
              >
                CREATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
