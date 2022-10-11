import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "container/Cart/CartItemCard";

const Cart = () => {
  const item = {
    product: "productID",
    price: 300,
    name: "Ao Polo",
  };
  return (
    <Fragment>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>

        <div className="cartContainer">
          <CartItemCard item={item} />
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
