import React from "react";
import playStore from "../../../accset/footer/appStore.png";
import appStore from "../../../accset/footer/chPlay.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <div>
          <img width={150} height={50} src={playStore} alt="playstore" />
          <img width={150} height={50} src={appStore} alt="Appstore" />
        </div>
      </div>
      <div className="midFooter">
        <h1>BabyShirts.</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2021 &copy; MeKhoiNguyen</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.facebook.com/bun.duongtrankhoinguyen/">FaceBook</a>
        <a href="https://www.instagram.com/duongtrankhoinguyen/">Instargram</a>
        <a href="https://github.com/meabhisingh/mernProjectEcommerce/tree/master/frontend/src">
          Git hub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
