import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import './Header.css';
import { Link } from 'react-router-dom';
import Sidebar from '../SideBar/SideBar';

const Header = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const props = [
        { name: 'Главная', path: '/' },
        { name: 'Препараты', path: '/medicine' },
    ];

    const checkWindowSize = () => {
        if (window.innerWidth < 600) {
            setIsMenuVisible(true);
        } else {
            setIsMenuVisible(false);
        }
    };

    useEffect(() => {
        checkWindowSize();
        window.addEventListener('resize', checkWindowSize);

        return () => {
            window.removeEventListener('resize', checkWindowSize);
        };
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="header">
            {isMenuVisible ? (
                <div className='menu-button'>
                    <Button name='Меню' onClick={toggleSidebar} />
                </div>
            ) : (
                <div className='Link_buttons'>
                    <Link to='/'><Button name='Главная' /></Link>
                    <Link to='/medicine'><Button name='Препараты' /></Link>
                </div>
            )}
            <div className='LogoConteiner'>
                <h2 className='Logo'> Farm&nbsp;Direct </h2>
            </div>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} props={props} />
        </div>
    );
};

export default Header;