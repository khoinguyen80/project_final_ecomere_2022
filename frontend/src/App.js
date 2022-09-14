import "./App.css";
import Header from "./container/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Webfont from "webfontloader";
import React from "react";
import Footer from "./container/Footer/Footer";
import Home from "./container/Home/Home";

function App() {
  React.useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home} />
      <Footer />
    </Router>
  );
}

export default App;
