import Header from '../../Components/Header/Header';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="PageConteiner">
            <Header />
            <div className="HomePage_Conteiner">
                <h1>Домашняя страница</h1>
            </div>
        </div>
    );
};

export default HomePage;