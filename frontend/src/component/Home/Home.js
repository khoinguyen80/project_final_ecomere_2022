import React, { Fragment } from "react";
import "./Home.css";
import Product from "./Product.js";

const product = {
  name: "Blue Tshirt",
  images: [
    { url: "https://ressmedia.com/wp-content/uploads/2021/07/ANH-1-2.jpg" },
  ],
  price: "1200",
  _id: "KhoiNguyen",
};
const Home = () => {
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
        <Product product={product} />
      </div>
    </Fragment>
  );
};

export default Home;
