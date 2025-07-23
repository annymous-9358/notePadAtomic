import React, { useState } from 'react';
import { AppLayout } from '../../templates';
import useNotes from '../../../hooks/useNotes';

const NotePadPage = () => {
  const {
    selectedNote,
    setSelectedNote,
    createNote,
    updateNote,
    deleteNote,
    restoreNote,
    permanentDeleteNote,
    toggleFavorite,
    getFilteredNotes,
    getNoteCounts
  } = useNotes();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleNewNote = () => {
    createNote();
  };

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setSelectedNote(null);
  };

  const filteredNotes = getFilteredNotes(activeCategory);
  const noteCounts = getNoteCounts();

  return (
    <AppLayout
      // Sidebar props
      activeCategory={activeCategory}
      onCategorySelect={handleCategorySelect}
      noteCounts={noteCounts}
      
      // NoteList props
      notes={filteredNotes}
      selectedNote={selectedNote}
      onNoteSelect={handleNoteSelect}
      onNewNote={handleNewNote}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onNoteFavorite={toggleFavorite}
      onNoteDelete={deleteNote}
      onNoteRestore={restoreNote}
      onNotePermanentDelete={permanentDeleteNote}
      
      // NoteEditor props
      onNoteUpdate={updateNote}
    />
  );
};

export default NotePadPage;
