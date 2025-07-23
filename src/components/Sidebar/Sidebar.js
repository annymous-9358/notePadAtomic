import React from 'react';
import styles from './Sidebar.module.css';
import { useTheme } from '../../context/ThemeContext';

function Sidebar({ activeCategory, onCategorySelect, noteCounts }) {
  const { isDarkTheme } = useTheme();
  const categories = [
    { id: 'all', name: 'Notes', count: noteCounts.all },
    { id: 'favorites', name: 'Favorites', count: noteCounts.favorites },
    { id: 'trash', name: 'Trash', count: noteCounts.trash }
  ];

  return (
    <div className={`${styles.sidebar} ${isDarkTheme ? styles.darkTheme : ''}`}>
      <div className={styles.header}>
        <h2>NotePad</h2>
      </div>
      
      <div className={styles.categories}>
        <h3>Categories</h3>
        <div className={styles.categoryList}>
          {categories.map(category => (
            <div
              key={category.id}
              className={`${styles.categoryItem} ${
                activeCategory === category.id ? styles.active : ''
              }`}
              onClick={() => onCategorySelect(category.id)}
            >
              <span>{category.name}</span>
              <span className={styles.count}>{category.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
