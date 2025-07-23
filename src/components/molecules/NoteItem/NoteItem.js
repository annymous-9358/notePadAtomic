import React, { useState, useEffect, useRef } from 'react';
import { Button, Icon, Text } from '../../atoms';
import { useTheme } from '../../../context/ThemeContext';
import styles from './NoteItem.module.css';

const NoteItem = ({ 
  note, 
  isSelected, 
  onSelect, 
  onFavorite, 
  onDelete, 
  onRestore, 
  onPermanentDelete,
  className = '' 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkTheme } = useTheme();
  const dropdownRef = useRef(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuAction = (e, action, noteId) => {
    e.stopPropagation();
    action(noteId);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen]);

  return (
    <div 
      className={`${styles.noteItem} ${isSelected ? styles.selected : ''} ${isDarkTheme ? styles.darkTheme : ''} ${className}`}
      onClick={() => onSelect(note)}
    >
      <div className={styles.noteContent}>
        <div className={styles.noteHeader}>
          <Text variant="body" weight="medium-weight" className={styles.noteTitle}>
            {note.title || 'Untitled'}
          </Text>
          {note.isFavorite && <Icon name="favorite" size="small" color="warning" />}
        </div>
        <Text variant="caption" color="muted" className={styles.noteDate}>
          {formatDate(note.updatedAt)}
        </Text>
      </div>
      
      <div className={styles.noteActions} ref={dropdownRef}>
        <Button
          variant="icon"
          onClick={toggleMenu}
          title="More options"
          className={styles.menuButton}
        >
          <Icon name="menu" />
        </Button>
        
        {isMenuOpen && (
          <div className={`${styles.dropdown} ${isDarkTheme ? styles.darkTheme : ''}`}>
            {!note.isDeleted ? (
              <>
                <button
                  onClick={(e) => handleMenuAction(e, onFavorite, note.id)}
                  className={styles.dropdownItem}
                >
                  {note.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                <button
                  onClick={(e) => handleMenuAction(e, onDelete, note.id)}
                  className={styles.dropdownItem}
                >
                  Move to Trash
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={(e) => handleMenuAction(e, onRestore, note.id)}
                  className={styles.dropdownItem}
                >
                  Restore Note
                </button>
                <button
                  onClick={(e) => handleMenuAction(e, onPermanentDelete, note.id)}
                  className={styles.dropdownItem}
                >
                  Delete Permanently
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteItem;
