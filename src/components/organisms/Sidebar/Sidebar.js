import React from 'react';
import { Text } from '../../atoms';
import { CategoryItem } from '../../molecules';
import { useTheme } from '../../../context/ThemeContext';
import styles from './Sidebar.module.css';

const Sidebar = ({ activeCategory, onCategorySelect, noteCounts }) => {
  const { isDarkTheme } = useTheme();
  
  const categories = [
    { id: 'all', name: 'Notes', count: noteCounts.all },
    { id: 'favorites', name: 'Favorites', count: noteCounts.favorites },
    { id: 'trash', name: 'Trash', count: noteCounts.trash }
  ];

  return (
    <div className={`${styles.sidebar} ${isDarkTheme ? styles.darkTheme : ''}`}>
      <div className={styles.header}>
        <Text variant="heading2">NotePad</Text>
      </div>
      
      <div className={styles.categories}>
        <Text variant="heading3" color="muted" className={styles.categoriesTitle}>
          Categories
        </Text>
        <div className={styles.categoryList}>
          {categories.map(category => (
            <CategoryItem
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={onCategorySelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
