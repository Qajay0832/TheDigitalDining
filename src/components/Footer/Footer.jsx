import React from "react";
import "./footer.css";
import FacebookIcon from "../../assets/facebook 1.svg";
import LinkedinIcon from "../../assets/linkedin (1) 1.svg";
import InstagramIcon from "../../assets/instagram 1.svg";
import TwitterIcon from "../../assets/twitter 1.svg";
const Footer = () => {
  return (
    <div className="footerContainer">
      <section className="footerSectionOne">
        {/* <img src={Logo} alt="Campus Tech" className="logo" /> */}
        <p className="logo  orangeText">Digital Diner</p>
        <div className="footerSectionTwo">
          <div className="footerRoutes">
            <p>Home</p>
            <p>Cart</p>
            <p>Login</p>
          </div>
          <div className="footerRoutes">
            <p className=" footerHR">Contact Us</p>
            <div className="footerContact">
              <p>qajay0832@gmail.com</p>
              <p>+91-777-303-4327</p>
            </div>
          </div>
          <div className="footerRoutes">
            <p className=" footerHR">Chat with us</p>
            <div className="footerLinks">
              <img src={FacebookIcon} alt="facebook" className="footerIcons" />
              <img
                src={InstagramIcon}
                alt="instagram"
                className="footerIcons"
              />
              <img src={TwitterIcon} alt="twitter" className="footerIcons" />
              <img src={LinkedinIcon} alt="linkedin" className="footerIcons" />
            </div>
          </div>
        </div>
      </section>
      <section className="footerSectionThree">
        <p>© 2025, MERN Stack Development Pvt. Ltd.</p>
        <p>Designed by Ajay Tiwari</p>
      </section>
    </div>
  );
};

export default Footer;
