import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import { Link } from 'react-router-dom';
import './Medicine_DictPage.css';

const MedicineDictPage = () => {
    const [atcs, setAtcs] = useState([]);
    const [open, setOpen] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/atc')
            .then((response) => {
                setAtcs(response.data);
            })
            .catch((error) => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);

    // Функция для построения дерева
    const buildTree = (nodes, parentId = null) => {
        return nodes
            .filter(node => node.parent === parentId)
            .map(node => ({
                ...node,
                children: buildTree(nodes, node.id),
            }));
    };

    // Функция для рендеринга АТС
    const renderATC = (atcs, level = 1) => {
        return atcs.map((atc) => {
            const isOpen = open === atc.id;
            return (
                <div key={atc.id}>
                    <label
                        className={`atc-level-${level}`}
                        onClick={() => setOpen(isOpen ? null : atc.id)}
                    >
                        {level === 1 ? (
                            <div className="atc-code-name">
                                <span className="atc-code">{atc.code}</span> {/* Добавляем контейнер для кода */}
                                <span>{atc.name}</span>
                            </div>
                        ) : (
                            <div className="atc-code-name">
                                <span className="atc-code">{atc.code}</span>  {/* Для всех уровней */}
                                <Link to={`/atc/${atc.id}`} className="atc-link">
                                    {atc.name}
                                </Link>
                            </div>
                        )}
                    </label>
                    {level === 1 && atc.children && atc.children.length > 0 && isOpen && (
                        <div className="children">
                            {renderATC(atc.children, level + 1)} {/* Рендерим детей */}
                        </div>
                    )}
                </div>
            );
        });
    };


    // Строим дерево АТС
    const atcTree = buildTree(atcs);

    return (
        <div className="PageConteiner">
            <Header />
            <div className="Medicine_DictPage_Conteiner">
                <div className="ATC_classification">
                    <h1>Классификация АТС</h1>
                    <div>{renderATC(atcTree)}</div>
                </div>
                {/* <div className="IDC_classification">
                    <h1>Классификация МКБ</h1>
                </div> */}
            </div>
        </div>
    );
};

export default MedicineDictPage;
