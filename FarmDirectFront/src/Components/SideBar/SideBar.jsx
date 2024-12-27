import React from 'react';
import Button from '../Custom_Button/Custom_Button';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar, props }) => {
    return (
        <div className={`Sidebar ${isOpen ? 'open' : ''}`}>
            <div className="Close-btn-Conteiner">
                <button className="Close-btn" onClick={toggleSidebar}>✖</button>
            </div>
            <div className='Sidebar-Item'>
                {props.map((link, index) => (
                    <Link to={link.path} key={index}>
                        <Button
                            name={link.name}
                            onClick={() => {
                                toggleSidebar();
                            }}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;