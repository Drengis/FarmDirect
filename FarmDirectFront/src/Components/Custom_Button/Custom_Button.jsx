import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Custom_Button.css';

const Custom_Button = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={`btn ${props.disabled ? 'btn-secondary' : 'btn-primary'}`} 
            disabled={props.disabled}
        >
            {props.name}
        </button>
    );
};

export default Custom_Button;