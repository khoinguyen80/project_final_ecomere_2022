import React, { Fragment, useEffect } from "react";
import "./Home.css";
import Product from "./ProductCard";
import { clearErrors, getProduct } from "container/action/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "container/Loader/Loader";

import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="banner">
            <p>Welcome to my BabyShop</p>
            <h1>Find Amazing Products Below</h1>
            <a href="#container">
              <button>Test Icon</button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product, index) => (
                <Product product={product} key={index} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
