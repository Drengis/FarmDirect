import './Button.css'

const Button = (props) => {
    return (
        <button onClick={props.onClick} className="Custom_Button" disabled={props.disabled}>
            {props.name}
        </button>
    );
};

export default Button;