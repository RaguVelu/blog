import React from "react";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";
import logoo from './assests/logoo.png';
export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <div className="logo-container">
        <img src={logoo} alt="MyBlog Logo" className="logo-image" />
        <Link to="/" className="logo">DigiDiary</Link>
      </div>
      <nav>
        {username && (
          <>
            <Link to="/create">
            <button className="nav-button">Create</button>
            </Link>
            <button className="button-64" onClick={logout}>
              Logout ({username})
            </button>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">
              <button className="button-64">Login</button>
            </Link>
            <Link to="/register">
              <button className="button-64">Register</button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}