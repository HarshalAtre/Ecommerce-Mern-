import React, { useState } from 'react';
import './NavbarComponent.css';
import 'boxicons/css/boxicons.min.css'; // Assuming you're using boxicons
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { GridSearchIcon } from '@material-ui/data-grid';

const NavbarComponent = () => {
  const [isActive, setIsActive] = useState(false);

  const handleMenuClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className='custom-bodyn'>
      <header className="custom-header">
        <Link to="/" className="custom-logo">Logo</Link>
        <i className='bx bx-menu' id="menu-icon" onClick={handleMenuClick}></i>
        <nav className={`custom-navbar ${isActive ? 'active' : ''}`}>
          <Link to="/" onClick={handleMenuClick}>Home</Link>
          <Link to="/products" onClick={handleMenuClick}>Products</Link>
          <Link to="/contact" onClick={handleMenuClick}>Contact</Link>
          <Link to="/about" onClick={handleMenuClick}>About</Link>
        </nav>
        <nav className={`custom-navbar ${isActive ? 'active' : ''}`}>
          <Link to="/search"><GridSearchIcon/></Link>
          <Link to="/Cart"><AddShoppingCartIcon/></Link>
          <Link to="/Login"><AccountBoxIcon/></Link>
        </nav>
      </header>
      <div className={`custom-nav-bg ${isActive ? 'active' : ''}`}></div>
    </div>
  );
};

export default NavbarComponent;
