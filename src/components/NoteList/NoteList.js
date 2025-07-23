import React, { useState, useEffect } from 'react';
import styles from './NoteList.module.css';
import { useTheme } from '../../context/ThemeContext';

function NoteList({ notes, selectedNote, onNoteSelect, onNewNote, searchTerm, onSearchChange, onNoteFavorite, onNoteDelete, onNoteRestore, onNotePermanentDelete }) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const { isDarkTheme } = useTheme();

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const toggleMenu = (e, noteId) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === noteId ? null : noteId);
  };

  const handleMenuAction = (e, action, noteId) => {
    e.stopPropagation();
    action(noteId);
    setOpenMenuId(null);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };

    if (openMenuId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openMenuId]);

  return (
    <div className={`${styles.noteList} ${isDarkTheme ? styles.darkTheme : ''}`}>
      <div className={styles.header}>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={onNewNote} className={styles.newNoteButton}>
          + New Note
        </button>
      </div>

      <div className={styles.notes}>
        {filteredNotes.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No notes found</p>
          </div>
        ) : (
          filteredNotes.map(note => (
            <div
              key={note.id}
              className={`${styles.noteItem} ${
                selectedNote?.id === note.id ? styles.selected : ''
              }`}
            >
              <div 
                className={styles.noteContent}
                onClick={() => onNoteSelect(note)}
              >
                <div className={styles.noteTitle}>
                  {note.title || 'Untitled'}
                  {note.isFavorite && <span className={styles.star}>★</span>}
                </div>
                <div className={styles.noteDate}>
                  {formatDate(note.updatedAt)}
                </div>
              </div>
              
              <div className={styles.noteActions}>
                <button
                  onClick={(e) => toggleMenu(e, note.id)}
                  className={styles.menuButton}
                  title="More options"
                >
                  ⋮
                </button>
                
                {openMenuId === note.id && (
                  <div className={styles.dropdown}>
                    {!note.isDeleted ? (
                      <>
                        <button
                          onClick={(e) => handleMenuAction(e, onNoteFavorite, note.id)}
                          className={styles.dropdownItem}
                        >
                          {note.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                        <button
                          onClick={(e) => handleMenuAction(e, onNoteDelete, note.id)}
                          className={styles.dropdownItem}
                        >
                          Move to Trash
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={(e) => handleMenuAction(e, onNoteRestore, note.id)}
                          className={styles.dropdownItem}
                        >
                          Restore Note
                        </button>
                        <button
                          onClick={(e) => handleMenuAction(e, onNotePermanentDelete, note.id)}
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
          ))
        )}
      </div>
    </div>
  );
}

export default NoteList;
