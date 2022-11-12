import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "container/action/productAction";
import Loader from "container/Loader/Loader";
import ReviewCard from "container/Product/ReviewCard";
import { useAlert } from "react-alert";
import { addItemsToCart } from "container/action/cartAction";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state?.productDetails
  );

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    // if (product?.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    // if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(match?.params?.id));
  }, [dispatch, match.params.id, error, alert]);

  if (loading) return <Loader />;
  return (
    <Fragment>
      {product && (
        <div className="ProductDetails">
          <div>
            <Carousel>
              {product?.images?.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={i}
                  src={item?.url}
                  alt={`${i} Slide`}
                />
              ))}
            </Carousel>
          </div>
          <div>
            <div className="detailsBlock-1">
              <p>Product # {product?._id}</p>
              <h2>{product?.name}</h2>
            </div>
            <div className="detailsBlock-3">
              <h1>{`$${product?.price}`}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick={decreaseQuantity}>-</button>
                  <input readOnly type="number" value={quantity} />
                  <button onClick={increaseQuantity}>+</button>
                </div>
                {""}
                <button onClick={addToCartHandler}>Add to Cart</button>
              </div>
              <p>
                Status: {""}
                <b className={product?.Stock < 1 ? "redColor" : "greenColor"}>
                  {product?.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>
            <div className="detailsBlock-4">
              Description : <p>{product?.description}</p>
            </div>

            <button className="submitReview">Submit Review</button>
          </div>
        </div>
      )}
      <div>
        <h3 className="reviewsHeading">REVIEWS</h3>
        {product?.reviews && product?.reviews[0] ? (
          <div className="reviews">
            {product?.reviews &&
              product?.reviews.map((review) => <ReviewCard review={review} />)}
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </div>
    </Fragment>
  );
};

export default ProductDetails;
