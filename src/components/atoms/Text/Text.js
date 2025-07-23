import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import styles from './Text.module.css';

const Text = ({ 
  children, 
  variant = 'body', 
  size = 'medium', 
  weight = 'normal',
  color = 'default',
  className = '',
  ...props 
}) => {
  const { isDarkTheme } = useTheme();
  
  const textClass = `
    ${styles.text} 
    ${styles[variant]} 
    ${styles[size]} 
    ${styles[weight]}
    ${styles[color]}
    ${isDarkTheme ? styles.darkTheme : ''}
    ${className}
  `.trim();

  const Tag = variant === 'heading1' ? 'h1' : 
             variant === 'heading2' ? 'h2' : 
             variant === 'heading3' ? 'h3' : 
             variant === 'label' ? 'label' : 'span';

  return (
    <Tag className={textClass} {...props}>
      {children}
    </Tag>
  );
};

export default Text;
