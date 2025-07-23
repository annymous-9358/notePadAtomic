import React from 'react';
import { Text } from '../../atoms';
import { useTheme } from '../../../context/ThemeContext';
import styles from './CategoryItem.module.css';

const CategoryItem = ({ 
  category, 
  isActive, 
  onClick, 
  className = '' 
}) => {
  const { isDarkTheme } = useTheme();
  
  return (
    <div
      className={`${styles.categoryItem} ${isActive ? styles.active : ''} ${isDarkTheme ? styles.darkTheme : ''} ${className}`}
      onClick={() => onClick(category.id)}
    >
      <Text variant="body" className={styles.categoryName}>
        {category.name}
      </Text>
      <Text variant="caption" color="muted" className={styles.categoryCount}>
        {category.count}
      </Text>
    </div>
  );
};

export default CategoryItem;
