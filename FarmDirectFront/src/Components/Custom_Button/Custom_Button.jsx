import 'bootstrap/dist/css/bootstrap.min.css'; // Убедитесь, что Bootstrap подключен
import './Custom_Button.css';

const Custom_Button = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={`btn ${props.disabled ? 'btn-secondary' : 'btn-primary'}`} // Используем классы Bootstrap
            disabled={props.disabled}
        >
            {props.name}
        </button>
    );
};

export default Custom_Button;