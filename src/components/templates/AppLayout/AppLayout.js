import React from 'react';
import { Sidebar, NoteList, NoteEditor } from '../../organisms';
import styles from './AppLayout.module.css';

const AppLayout = ({
  // Sidebar props
  activeCategory,
  onCategorySelect,
  noteCounts,
  
  // NoteList props
  notes,
  selectedNote,
  onNoteSelect,
  onNewNote,
  searchTerm,
  onSearchChange,
  onNoteFavorite,
  onNoteDelete,
  onNoteRestore,
  onNotePermanentDelete,
  
  // NoteEditor props
  onNoteUpdate
}) => {
  return (
    <div className={styles.appLayout}>
      <Sidebar
        activeCategory={activeCategory}
        onCategorySelect={onCategorySelect}
        noteCounts={noteCounts}
      />
      
      <NoteList
        notes={notes}
        selectedNote={selectedNote}
        onNoteSelect={onNoteSelect}
        onNewNote={onNewNote}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onNoteFavorite={onNoteFavorite}
        onNoteDelete={onNoteDelete}
        onNoteRestore={onNoteRestore}
        onNotePermanentDelete={onNotePermanentDelete}
      />
      
      <NoteEditor
        note={selectedNote}
        onNoteUpdate={onNoteUpdate}
        onNoteDelete={onNoteDelete}
      />
    </div>
  );
};

export default AppLayout;
