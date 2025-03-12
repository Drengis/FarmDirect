import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Для получения ID из URL
import Header from '../../Components/Header/Header';
import './ATCDetailPage.css';
import { Link } from 'react-router-dom';  // Импортируем Link для роутинга

const ATCDetailPage = () => {
    const [atc, setAtc] = useState(null);
    const [parentChain, setParentChain] = useState([]);  // Для хранения цепочки родительских категорий
    const { id } = useParams();  // Получаем ID из URL

    useEffect(() => {
        // Загружаем данные текущей категории
        axios.get(`http://127.0.0.1:8000/api/atc/${id}`)
            .then((response) => {
                setAtc(response.data);
            })
            .catch((error) => {
                console.error('Ошибка при получении данных:', error);
            });

        // Загружаем цепочку родительских категорий
        axios.get(`http://127.0.0.1:8000/api/atc/${id}/parents/`)
            .then((response) => {
                setParentChain(response.data.parent_chain);  // Устанавливаем цепочку родительских категорий
            })
            .catch((error) => {
                console.error('Ошибка при получении цепочки родительских категорий:', error);
            });
    }, [id]);

    if (!atc) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="PageConteiner">
            <Header />
            <div className="ATCDetailPage_Conteiner">
                <div className="atc-detail">
                    <div className='way-site'>
                        <ul className="parent-chain">
                            {parentChain.reverse().map((parent, index) => (
                                <li key={parent.id} className="parent-item">
                                    <Link to={`/atc/${parent.id}`} className="atc-link">
                                        {parent.code} - {parent.name}
                                    </Link>
                                    {index < parentChain.length - 1 && <span className="separator"> / </span>}  {/* Разделитель между элементами цепочки */}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <h1>{atc.parent ? `${atc.parent.code} - ${atc.parent.name}` : 'Нет родительской категории'}</h1>
                    <div className="children">
                        {atc.children && atc.children.length > 0 && (
                            <div>
                                <h3>Подкатегории:</h3>
                                <ul>
                                    {atc.children.map(child => (
                                        <li key={child.id}>
                                            <Link to={`/atc/${child.id}`} className="atc-link">
                                                <span className="atc-code">{child.code}</span> - {child.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ATCDetailPage;
