import React from "react";
import "./Footer.css";
import fb_icon from "../../assets/images/fb_icon.png";
import githubIcon from "../../assets/images/githubIcon.png";
import linkedinIcon from "../../assets/images/linkedinIcon.png";

function Footer() {
  return (
    <footer className="footer__items">
      <ul className="footer__menu">
        <li>
          <a href="https://www.facebook.com/pratyushnfsrock/">
            <img src={fb_icon} alt="fb" height={30} width={30} />
          </a>
        </li>
        <li>
          <a href="https://github.com/pratyushd1201">
            <img src={githubIcon} alt="github" height={30} width={30} />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/pratyush-das-opentowork/">
            <img src={linkedinIcon} alt="linkedin" height={30} width={30} />
          </a>
        </li>
      </ul>
      <h3 className="credit">
        &copy;Developed by <strong>Pratyush Das</strong>
      </h3>
    </footer>
  );
}

export default Footer;
