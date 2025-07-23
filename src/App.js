import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import NoteList from './components/NoteList/NoteList';
import NoteEditor from './components/NoteEditor/NoteEditor';
import useNotes from './hooks/useNotes';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';
import './App.css';

function App() {
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
    <ThemeProvider>
      <SettingsProvider>
        <div className="App">
          <Sidebar
            activeCategory={activeCategory}
            onCategorySelect={handleCategorySelect}
            noteCounts={noteCounts}
          />
          
          <NoteList
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
          />
          
          <NoteEditor
            note={selectedNote}
            onNoteUpdate={updateNote}
            onNoteDelete={deleteNote}
          />
        </div>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
