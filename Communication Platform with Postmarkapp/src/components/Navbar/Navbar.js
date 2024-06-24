import React from "react";
import images from "../../assets/images/images.png";
import { MenuItems } from "./MenuItems";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Button } from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducer/loginReducer";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <nav className="navbar__items">
      <div className="navbar__logo">
        <img className="icon" src={images} alt="logo"></img>
        <h1>Postmark Email</h1>
      </div>

      <div className="menu__icon"> </div>
      <ul className="nav__menu">
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link className={item.className} to={item.url}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
      <Button onClick={() => handleLogout()}>Logout</Button>
      {loggedInUser ? (
        <h2 className="username">Pratyush Das</h2>
      ) : null}
    </nav>
  );
}

export default Navbar;
