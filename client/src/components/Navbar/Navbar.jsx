import React from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom'
// import { useEffect } from 'react';
// import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/context.js";
import { ROLES } from '../../App.js';
import Login from '../../pages/Login/Login.jsx';
import Logout from '../../pages/Logout';


function Navbar() {
  const navigate = useNavigate();
  // const { logout } = useAuth();

  // const HandleLogout = ()=>{
  //   console.log("Logging out ...");
  //   logout();
  //   navigate("/");
  //   console.log("Oops logout ");
  // }

  // Get current user from local storage
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className='navbar'>
      <div className="logo">
        <Link to="./">
          <span>StayQuest</span>
        </Link>
      </div>
      <div className="links">
        {/* Home link */}
        <div className="link"><Link to="./">Home</Link></div>
        {/* About us link */}
        {/* <div className="link"><Link to="./">Search</Link></div> */}
        {currentUser  && currentUser.role.includes(ROLES.Host) && (
          <div className="link"><Link to="./mylistings">MyListings</Link></div>
        )}
        {currentUser  && currentUser.role.includes(ROLES.Host) && (
          <div className="link"><Link to="./create">Create Listing</Link></div>
        )}
        {currentUser  && currentUser.role.includes(ROLES.Renter) && (
          <div className="link"><Link to="./reservations">MyReservations</Link></div>
        )}
         {currentUser  && currentUser.role.includes(ROLES.Host) && (
          <div className="link"><Link to="./reservations">MyReservations</Link></div>
        )}
        {/* {currentUser  && currentUser.role.includes(ROLES.Host) && (
          <div className="link create"><Link to="./create">Create Listing</Link></div>
        )} */}
        {/* About us link */}
        <div className="link"><Link to="./Aboutus">About us</Link></div>
        {/* If there's no user logged in, show Login and Sign Up links */}
        {!currentUser && (<div className=""><Login/></div>)}
        
        {/* If logged in user is an Admin, show Admin Dashboard link */}
        {currentUser && currentUser.role == ROLES.Admin && (
          <div className="link"><Link to="./admin-dashboard">Admin Dashboard</Link></div>
        )}
        {/* Account Settings link */}
        <div className="link"><Link to="./"></Link></div>
        {currentUser && (<div className="logout-component"><Logout/></div>)}
      </div>
    </div>
  )
}

export default Navbar;