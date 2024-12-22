import React from 'react';
import Button from '../Button/Button';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <div className='Link_buttons'>
                <Link to='/'><Button name='Домашняя старница' /></Link>
                <Link to='/medicine'><Button name='Препараты' /></Link>
            </div>
            <div className='LogoConteiner'>
                <h2 className='Logo'> Farm-Direct </h2>
            </div>
        </div>
    );
};

export default Header;