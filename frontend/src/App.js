import "./App.css";
import Header from "./container/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
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

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/login" component={LoginSignUp} />
      <Footer />
    </Router>
  );
}

export default App;
