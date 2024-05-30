import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import PrivateRoute from "../context/privateroute";

function Navbar(){
    const { isAuthenticated, logout } = useAuth();
    return(
          
<>
 <nav style={navStyle}>
 <div style={brandStyle}>D-NETWORK</div>
 <input type="text" placeholder="Search" style={searchStyle} />
 <div style={iconsStyle}>
   <a href="/" style={iconLinkStyle}><i className="fas fa-home" style={iconStyle}></i></a>
   <a href="/toast" style={iconLinkStyle}><i className="fas fa-paper-plane" style={iconStyle}></i></a>
   <a href="/user-profile" style={iconLinkStyle}><i className="fas fa-user" style={iconStyle}></i></a>
   <button onClick={logout}>Logout</button>
 </div>
 </nav>
    </>

  );
}

const navStyle = {
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',

  justifyContent: 'space-between',
  padding: '10px 20px',
  backgroundColor: '#000000',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const brandStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const searchStyle = {
  padding: '5px 10px',
  borderRadius: '20px',
  border: '1px solid #ccc',
  width: '200px',
};

const iconsStyle = {
  display: 'flex',
  alignItems: 'center',
};

const iconLinkStyle = {
  margin: '0 10px',
  textDecoration: 'none',
  color: '#333',
};

const iconStyle = {
  fontSize: '20px',
};

export default Navbar;



