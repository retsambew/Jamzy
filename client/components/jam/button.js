"use-client";

const Button = (props) => {
  return (
    <button className={props.classes} onClick={props.callback}>
      {props.val}
    </button>
  );
};

export default Button;
