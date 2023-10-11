import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav className="navbar is-background-rounded tppattern" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <img src="Sprite-0002.png" style={{height: 90}}></img>
        <a 
          role="button" 
          className={`navbar-burger ${isActive ? 'is-active' : ''}`} 
          aria-label="menu" 
          aria-expanded="false" 
          data-target="navbarBasicExample" 
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <Link to="/" className="navbar-item is-size-3 has-text-info has-text-weight-semibold">
            Devices
          </Link>
          <Link to="/settings" className="navbar-item is-size-3 has-text-info has-text-weight-semibold">
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
