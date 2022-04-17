import PropTypes from 'prop-types';
import React from 'react';
import './button.scss';

function Button(props) {
  const { className = '', onClick = null, children } = props;
  return (
    <button className={`btn ${className}`} onClick={onClick ? () => onClick() : null}>
      {children}
    </button>
  );
}

export function OutlineButton(props) {
  return (
    <Button
      className={`btn-outline ${props.className}`}
      onClick={props.onClick ? props.onClick : null}
    >
      {props.children}
    </Button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Button;
