import Header from '../../Components/Header/Header';
import './MedicinePage.css';


const MedicinePage = () => {
    return (
        <div className="PageContainer">
            <Header />
            <div className="MedicinePage_Container">
                <div className="MedicinesList">
                    <h1 className='MedicineTitle'>Парацетамол</h1>
                    <div className="MedicineInfo">
                        <div className="InfoItem">Фармакокинетика: Парацетамол быстро всасывается из ЖКТ, достигая максимальной концентрации в крови через 30-60 минут. Метаболизируется в печени и выводится почками.</div>
                        <div className="InfoItem">Показания к применению: Лечение боли (головной, зубной, мышечной) и лихорадки различного происхождения.</div>
                        <div className="InfoItem">Способ применения: Взрослым и детям старше 12 лет назначают по 500-1000 мг на прием, максимальная доза — 4000 мг в день.</div>
                        <div className="InfoItem">Побочные действия: Возможны аллергические реакции, диспепсия, нарушение функции печени при превышении дозы.</div>
                        <div className="InfoItem">Противопоказания: Гиперчувствительность к парацетамолу, тяжелые нарушения функции печени, алкогольная зависимость.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicinePage;