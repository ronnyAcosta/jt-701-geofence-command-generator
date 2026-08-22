import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ACTIVE_COLOR = '#07bcff';
const ERROR_COLOR = 'red';
const ON_FOCUS_STYLE = {
  borderBottom: '1px solid #07bcff',
  boxShadow: '0 1px 0 0 #07bcff'
};
const ON_ERROR_STYLE = {
  borderBottom: '2px solid red',
};


const FormField = ({
  icon,
  id,
  name,
  type = 'text',
  value,
  onChange,
  onBlurClearError,
  label,
  errorMessage,
  hasError = false,
  showErrorMessage,
  autoComplete,
}) => {
  const [focused, setFocused] = useState(false);

  const iconColor = focused
    ? ACTIVE_COLOR
    : (hasError ? ERROR_COLOR : '#000');

  const labelColor = focused
    ? ACTIVE_COLOR
    : (hasError ? ERROR_COLOR : undefined);
    
  const messageVisible = showErrorMessage !== undefined ? showErrorMessage : hasError;
  
  const isLabelActive = focused || Boolean(value && value.length > 0);
  

  const handleFocus = () => setFocused(true);

  const handleBlur = () => {
    setFocused(false);
    
    if (onBlurClearError) onBlurClearError();
  };

  return (
    <div className="input-field col s12">
      <i className="material-icons prefix" style={{ color: iconColor }}>
        {icon}
      </i>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="validate"
                style={ focused ? ON_FOCUS_STYLE : hasError ? ON_ERROR_STYLE : undefined }
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <label
        htmlFor={id}
        className={isLabelActive ? 'active' : undefined}
        style={labelColor ? { color: labelColor } : undefined}
      >
        {label}
      </label>
      {errorMessage && (
        <div
          className="center error-message"
          style={{ display: messageVisible ? 'block' : 'none' }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

FormField.propTypes = {
  icon: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlurClearError: PropTypes.func,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  showErrorMessage: PropTypes.bool,
  autoComplete: PropTypes.string,
};

export default FormField;
