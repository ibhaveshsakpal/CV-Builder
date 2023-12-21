import { googleLogout } from "@react-oauth/google";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    googleLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("isSocial");
    navigate("/login");
  };

  useEffect(() => {
    if (!localStorage.getItem("isSocial")) {
      fetch(`${process.env.REACT_APP_BASE_URL}/isUserAuth`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => (data.isLoggedin ? null : navigate("/login")));
    }
  }, []);

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-uppercase" to="/">
            CV Builder
          </Link>
          <div>
            <label className="pr-2 fw-bold pr-3">
              Hello {localStorage.getItem("username")}!
            </label>
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
