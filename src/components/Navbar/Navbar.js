import React from 'react';

//css
import classes from './Navbar.module.css';

//images
import logo from '../../assets/ls-logo.png';

const navbar = props => {
    return (
        <div className={classes.Navbar}>
            <img src={logo} alt="logo"/>
            <div></div>
            <p>Dashboard</p>
        </div>
    );
}

export default navbar;