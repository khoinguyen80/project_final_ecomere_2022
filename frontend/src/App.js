import "./App.css";
import { useEffect, useState } from "react";
import Header from "./container/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Webfont from "webfontloader";
import React from "react";
import Footer from "./container/Footer/Footer";
import Home from "./container/Home/Home";
import ProductDetails from "container/Product/ProductDetails";
import Products from "container/Product/Products";
import Search from "container/Product/Search";
import LoginSignUp from "container/User/LoginSignUp";
import store from "./store";
import { loadUser } from "container/action/userAction";
import UserOptions from "container/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "container/User/Profile";
import ProtectedRoute from "container/Route/ProtectedRoute";
import UpdateProfile from "container/User/UpdateProfile";
import UpdatePassword from "container/User/UpdatePassword";
import ForgotPassword from "container/User/ForgotPassword";
import ResetPassword from "container/User/ResetPassword";
import Cart from "container/Cart/Cart";
import Shipping from "container/Cart/Shipping";
import ConfirmOrder from "container/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "container/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "container/Cart/OrderSuccess";
import MyOrders from "container/Order/MyOrders";
import OrderDetails from "container/Order/OrderDetails";
import Dashboard from "container/admin/Dashboard";
import ProductList from "container/admin/ProductList";
import NewProduct from "container/admin/NewProduct";
import UpdateProduct from "container/admin/UpdateProduct";
import OrderList from "container/admin/OrderList";
import ProcessOrder from "container/admin/ProcessOrder";
import UsersList from "container/admin/UsersList";
import UpdateUser from "container/admin/UpdateUser";
import ProductReviews from "container/admin/ProductReviews";
import Contact from "container/contact/Contact";
import About from "container/about/About";
import NotFound from "container/NotFound/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={About} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route exact path="/login" component={LoginSignUp} />
        <Route exact path="/cart" component={Cart} />

        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/success" component={OrderSuccess} />
        <ProtectedRoute exact path="/orders" component={MyOrders} />

        <Switch>
          <ProtectedRoute
            exact
            path="/order/confirm"
            component={ConfirmOrder}
          />
          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute
            exact
            path="/admin/products"
            isAdmin={true}
            component={ProductList}
          />
          <ProtectedRoute
            exact
            path="/admin/product"
            isAdmin={true}
            component={NewProduct}
          />
          <ProtectedRoute
            exact
            path="/admin/product/:id"
            isAdmin={true}
            component={UpdateProduct}
          />
          <ProtectedRoute
            exact
            path="/admin/orders"
            isAdmin={true}
            component={OrderList}
          />

          <ProtectedRoute
            exact
            path="/admin/order/:id"
            isAdmin={true}
            component={ProcessOrder}
          />

          <ProtectedRoute
            exact
            path="/admin/users"
            isAdmin={true}
            component={UsersList}
          />
          <ProtectedRoute
            exact
            path="/admin/user/:id"
            isAdmin={true}
            component={UpdateUser}
          />

          <ProtectedRoute
            exact
            path="/admin/reviews"
            isAdmin={true}
            component={ProductReviews}
          />
          <Route
            component={
              window.location.pathname === "/process/payment" ? null : NotFound
            }
          />
        </Switch>

        <Footer />
      </Switch>
    </Router>
  );
}

export default App;
