import React, { Fragment, useEffect } from "react";
import "./Home.css";
import Product from "./Product";
import { getProduct } from "../../container/action/productAction";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );
  console.log(products);
  useEffect(() => {
    dispatch(getProduct());
  }, []);

  return (
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
        {products && products.map((product) => <Product product={product} />)}
      </div>
    </Fragment>
  );
};

export default Home;
