import React, { useState, useRef, useEffect } from "react";
import "./navbar.css";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };

    if (showSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar]);
  return (
    <div className="navContainer">
      <div className={`navbarContainer ${showSidebar ? "navDirection" : ""}`}>
        <p className="logo  orangeText">Digital Diner</p>
        <div className="navRoutes">
          <Link to="/" className="navRoute">
            Menu
          </Link>
          <Link to="/cart" className="navRoute">
            Cart
          </Link>
          {user ? (
            <>
              <Link to="/orders" className="navRoute">
                Orders
              </Link>
              {user.isAdmin && (
                <Link to="/admin" className="navRoute">
                  Admin
                </Link>
              )}
              <Button
                className={"navRoute"}
                text={"Logout"}
                handleClick={() => dispatch(logout())}
              />
            </>
          ) : (
            <>
              <Button
                className={"navRoute"}
                text={"Login"}
                handleClick={() => navigate("/login")}
              />
            </>
          )}
        </div>
        <Button
          className={"menuBtn"}
          text={"Menu"}
          handleClick={() => setShowSidebar(!showSidebar)}
        />
      </div>
      <div
        className={`sidebarMenu ${showSidebar ? "displaySidebar" : ""}`}
        ref={sidebarRef}
      >
        <p className="logo">Digital Diner</p>
        <Link to="/" className="navRoute">
          Menu
        </Link>
        <Link to="/cart" className="navRoute">
          Cart
        </Link>
        {user ? (
          <>
            <Link to="/orders" className="navRoute">
              Orders
            </Link>
            {user.isAdmin && (
              <Link to="/admin" className="navRoute">
                Admin
              </Link>
            )}
            <Button
              className={"navRoute"}
              text={"Logout"}
              handleClick={() => dispatch(logout())}
            />
          </>
        ) : (
          <>
            <Button
              className={"navRoute"}
              text={"Login"}
              handleClick={() => navigate("/login")}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
