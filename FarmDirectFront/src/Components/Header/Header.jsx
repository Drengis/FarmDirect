import React from 'react';
import Button from '../Button/Button';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <Link to='/'><Button name='Домашняя старница' /></Link>
            <Link to='/medicine'><Button name='Препараты' /></Link>
        </div>
    );
};

export default Header;