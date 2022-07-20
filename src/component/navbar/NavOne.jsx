import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';
import Cookies from 'js-cookie';

const NavOne = () => {
  const login = localStorage.getItem('_bill_access_user_login');
  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (login) {
      setStatus(true);
    }
  }, []);

  const logout = () => {
    Cookies.remove('_bill_access_user_tokon_');
    localStorage.removeItem('_bill_access_user_login');
    console.clear();
    window.location.href = '/login';
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink to="/" className="navbar-brand">
          Pay<span class="text-warning">BILL</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {status ? (
              <>
                <li className="nav-item">
                  <button className="btn btn-warning" onClick={() => logout()}>
                    Logout
                  </button>
                </li>
                <li className="nav-item">
                  <NavLink to="/addbill" className="nav-link">
                    Add Bill
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavOne;
