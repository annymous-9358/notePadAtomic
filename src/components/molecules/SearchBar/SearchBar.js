import React from 'react';
import { Input, Button } from '../../atoms';
import { useTheme } from '../../../context/ThemeContext';
import styles from './SearchBar.module.css';

const SearchBar = ({ 
  value, 
  onChange, 
  onNewNote, 
  placeholder = "Search notes...",
  className = '' 
}) => {
  const { isDarkTheme } = useTheme();
  
  return (
    <div className={`${styles.searchBar} ${isDarkTheme ? styles.darkTheme : ''} ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchInput}
      />
      <Button onClick={onNewNote} variant="primary" className={styles.newNoteButton}>
        + New Note
      </Button>
    </div>
  );
};

export default SearchBar;
