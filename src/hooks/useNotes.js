import { useState, useEffect } from 'react';

function useNotes() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notepad-notes');
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes);
        setNotes(parsedNotes);
      } catch (error) {
        const welcomeNote = {
          id: Date.now(),
          title: 'Welcome to NotePad!',
          content: `# Welcome to NotePad!

This is a simple note-taking app built with React.

## Features:
- Create and edit notes
- Add notes to favorites
- Move notes to trash
- Search through your notes
- Data is saved in your browser's local storage

Start by creating your first note!`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isFavorite: false,
          isDeleted: false
        };
        setNotes([welcomeNote]);
        setSelectedNote(welcomeNote);
      }
    } else {
      const welcomeNote = {
        id: Date.now(),
        title: 'Welcome to TakeNote!',
        content: `# Welcome to TakeNote!

This is a simple note-taking app built with React.

## Features:
- Create and edit notes
- Add notes to favorites
- Move notes to trash
- Search through your notes
- Data is saved in your browser's local storage

Start by creating your first note!`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isFavorite: false,
        isDeleted: false
      };
      setNotes([welcomeNote]);
      setSelectedNote(welcomeNote);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('notepad-notes', JSON.stringify(notes));
    }
  }, [notes, isLoaded]);

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: '',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false,
      isDeleted: false
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setSelectedNote(newNote);
    return newNote;
  };

  const updateNote = (updatedNote) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === updatedNote.id ? updatedNote : note
      )
    );
    setSelectedNote(updatedNote);
  };

  const deleteNote = (noteId) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId
          ? { ...note, isDeleted: true, updatedAt: new Date().toISOString() }
          : note
      )
    );
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
    }
  };

  const restoreNote = (noteId) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId
          ? { ...note, isDeleted: false, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  const permanentDeleteNote = (noteId) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
    }
  };

  const toggleFavorite = (noteId) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId
          ? { 
              ...note, 
              isFavorite: !note.isFavorite, 
              updatedAt: new Date().toISOString() 
            }
          : note
      )
    );
  };

  const getFilteredNotes = (category) => {
    switch (category) {
      case 'favorites':
        return notes.filter(note => note.isFavorite && !note.isDeleted);
      case 'trash':
        return notes.filter(note => note.isDeleted);
      case 'all':
      default:
        return notes.filter(note => !note.isDeleted);
    }
  };

  const getNoteCounts = () => {
    return {
      all: notes.filter(note => !note.isDeleted).length,
      favorites: notes.filter(note => note.isFavorite && !note.isDeleted).length,
      trash: notes.filter(note => note.isDeleted).length
    };
  };

  return {
    notes,
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
  };
}

export default useNotes;
