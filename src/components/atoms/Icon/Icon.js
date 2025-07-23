import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import styles from './Icon.module.css';

const Icon = ({ 
  name, 
  size = 'medium', 
  color = 'default',
  className = '',
  onClick,
  ...props 
}) => {
  const { isDarkTheme } = useTheme();
  
  const iconClass = `
    ${styles.icon} 
    ${styles[size]} 
    ${styles[color]}
    ${onClick ? styles.clickable : ''}
    ${isDarkTheme ? styles.darkTheme : ''}
    ${className}
  `.trim();


  const iconMap = {
    star: '⭐',
    'star-outline': '☆',
    trash: '🗑️',
    download: '⬇️',
    copy: '📋',
    edit: '✏️',
    eye: '👁️',
    settings: '⚙️',
    sun: '☀️',
    moon: '🌙',
    menu: '⋮',
    plus: '+',
    favorite: '★',
    restore: '↩️',
    delete: '🗑️'
  };

  return (
    <span 
      className={iconClass}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {iconMap[name] || name}
    </span>
  );
};

export default Icon;
