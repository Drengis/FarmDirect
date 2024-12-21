import 'bootstrap/dist/css/bootstrap.min.css'; // Убедитесь, что Bootstrap подключен
import './Button.css';

const Button = (props) => {
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

export default Button;