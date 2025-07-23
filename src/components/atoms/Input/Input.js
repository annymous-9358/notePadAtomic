import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import styles from './Input.module.css';

const Input = ({ 
  type = 'text',
  value,
  onChange,
  placeholder = '',
  className = '',
  disabled = false,
  required = false,
  name,
  id,
  ...props 
}) => {
  const { isDarkTheme } = useTheme();
  
  const inputClass = `
    ${styles.input} 
    ${disabled ? styles.disabled : ''} 
    ${isDarkTheme ? styles.darkTheme : ''}
    ${className}
  `.trim();

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={inputClass}
      disabled={disabled}
      required={required}
      name={name}
      id={id}
      {...props}
    />
  );
};

export default Input;
