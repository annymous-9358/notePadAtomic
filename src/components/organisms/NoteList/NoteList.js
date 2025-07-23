import React from 'react';
import { Text } from '../../atoms';
import { SearchBar, NoteItem } from '../../molecules';
import { useTheme } from '../../../context/ThemeContext';
import styles from './NoteList.module.css';

const NoteList = ({ 
  notes, 
  selectedNote, 
  onNoteSelect, 
  onNewNote, 
  searchTerm, 
  onSearchChange, 
  onNoteFavorite, 
  onNoteDelete, 
  onNoteRestore, 
  onNotePermanentDelete 
}) => {
  const { isDarkTheme } = useTheme();

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${styles.noteList} ${isDarkTheme ? styles.darkTheme : ''}`}>
      <SearchBar
        value={searchTerm}
        onChange={onSearchChange}
        onNewNote={onNewNote}
      />

      <div className={styles.notes}>
        {filteredNotes.length === 0 ? (
          <div className={styles.emptyState}>
            <Text variant="body" color="muted">No notes found</Text>
          </div>
        ) : (
          filteredNotes.map(note => (
            <NoteItem
              key={note.id}
              note={note}
              isSelected={selectedNote?.id === note.id}
              onSelect={onNoteSelect}
              onFavorite={onNoteFavorite}
              onDelete={onNoteDelete}
              onRestore={onNoteRestore}
              onPermanentDelete={onNotePermanentDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NoteList;
