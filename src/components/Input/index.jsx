import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

function Input(props) {
  const { type = '', value = '', placeholder = '', onChange = null } = props;
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value === null ? '' : value}
      onChange={onChange ? (e) => onChange(e) : null}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
