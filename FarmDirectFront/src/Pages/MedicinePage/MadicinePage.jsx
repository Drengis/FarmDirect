import Header from '../../Components/Header/Header';
import './MedicinePage.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, InputGroup, ListGroup } from 'react-bootstrap';

const MedicinePage = () => {
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

    return (
        <div className="PageConteiner">
            <Header />
            <div className="MedicinePage_Container">
                <div className='Search'>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Поиск препаратов..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </InputGroup>
                    {searchQuery && (
                        <ListGroup>
                            {filteredMedicines.length > 0 ? (
                                filteredMedicines.map((medicine, index) => (
                                    <ListGroup.Item key={index}>{medicine}</ListGroup.Item>
                                ))
                            ) : (
                                <ListGroup.Item>Нет результатов для: {searchQuery}</ListGroup.Item>
                            )}
                        </ListGroup>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MedicinePage;