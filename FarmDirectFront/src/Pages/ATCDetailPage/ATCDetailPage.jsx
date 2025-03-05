import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Для получения ID из URL
import Header from '../../Components/Header/Header';
import './ATCDetailPage.css';
import { Link } from 'react-router-dom';  // Импортируем Link для роутинга

const ATCDetailPage = () => {
    const [atc, setAtc] = useState(null);
    const { id } = useParams();  // Получаем ID из URL

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/atcs/${id}`)  // Запрос для получения данных по ID
            .then((response) => {
                setAtc(response.data);
            })
            .catch((error) => {
                console.error('Ошибка при получении данных:', error);
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
                    <h1>{atc.parent.code} - {atc.parent ? atc.parent.name : 'Нет родительской категории'}</h1>
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
