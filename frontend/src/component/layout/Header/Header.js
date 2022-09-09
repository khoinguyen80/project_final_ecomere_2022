import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../accset/header/logoBabyShop.jpg";

const Header = () => {
  const options = {
    burgerColorHover: "#eb4034",
    logo,
    logoWidth: "20vmax",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "35px",
    link1Color: "rgba(35, 35, 35,0.8)",
    link1ColorHover: "#eb4034",
    nav1alignItems: "start",
    nav2alignItems: "start",
    nav3alignItems: "start",
    link1Margin: "70px 20px 0 80px",
    profileIconUrl: "/login",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
  };
  return <ReactNavbar {...options} />;
};

export default Header;
