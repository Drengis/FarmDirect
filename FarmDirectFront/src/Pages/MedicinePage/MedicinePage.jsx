import Header from '../../Components/Header/Header';
import './MedicinePage.css';


const MedicinePage = () => {
    return (
        <div className="PageContainer">
            <Header />
            <div className="MedicinePage_Container">
                <div className="MedicinesList">
                    <h1 className='MedicineTitle'></h1>
                    <div className="MedicineInfo">
                        <div className="InfoItem"></div>
                        <div className="InfoItem"></div>
                        <div className="InfoItem"></div>
                        <div className="InfoItem"></div>
                        <div className="InfoItem"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicinePage;