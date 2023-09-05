import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const auth = localStorage.getItem("user");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav>
      {auth ? (
        <div className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add products</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/signUp" onClick={logout}>
              Logout({JSON.parse(auth).name})
            </Link>
          </li>
        </div>
      ) : (
        <div className="signUp">
          <li>
            <Link to="/signUp">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      )}
    </nav>
  );
};

export default Nav;
