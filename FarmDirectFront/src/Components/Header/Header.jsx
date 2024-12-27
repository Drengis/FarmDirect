import React, { useEffect, useState } from 'react';
import Custom_Button from '../Custom_Button/Custom_Button';
import './Header.css';
import { Link } from 'react-router-dom';
import Sidebar from '../SideBar/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, InputGroup, ListGroup, Button } from 'react-bootstrap';

const Header = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const medicines = [
        'Парацетамол',
        'Ибупрофен',
        'Аспирин',
        'Анальгин',
        'Нурофен',
        'Цитрамон'
    ];

    const filteredMedicines = medicines.filter(medicine =>
        medicine.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const props = [
        { name: 'Главная', path: '/' },
        { name: 'Препараты', path: '/medicine_list' },
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
                    <Custom_Button name='Меню' onClick={toggleSidebar} />
                </div>
            ) : (
                <div className='Link_buttons'>
                    <Link to='/'><Custom_Button name='Главная' /></Link>
                    <Link to='/medicine_list'><Custom_Button name='Препараты' /></Link>
                </div>
            )}
            <div className='Search'>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Поиск препаратов..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </InputGroup>
                {searchQuery && (
                    <div className="ResultsOverlay">
                        <ListGroup>
                            {filteredMedicines.length > 0 ? (
                                filteredMedicines.map((medicine, index) => (
                                    <ListGroup.Item key={index}>
                                        <Link to={`/medicine`}>
                                            <Button variant="light" className="ResultButton">
                                                {medicine}
                                            </Button>
                                        </Link>
                                    </ListGroup.Item>
                                ))
                            ) : (
                                <ListGroup.Item>
                                    <Button variant="light" className="ResultButton">
                                        Нет результатов для: {searchQuery}
                                    </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </div>
                )}
            </div>
            <div className='LogoConteiner'>
                <h2 className='Logo'> Farm&nbsp;Direct </h2>
            </div>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} props={props} />
        </div>
    );
};

export default Header;