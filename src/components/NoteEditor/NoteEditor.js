import React, { useState, useRef, useEffect } from 'react';
import styles from './NoteEditor.module.css';
import { useTheme } from '../../context/ThemeContext';
import { useSettings } from '../../context/SettingsContext';
import Settings from '../Settings/Settings';

function NoteEditor({ note, onNoteUpdate, onNoteDelete }) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const { isDarkTheme, toggleTheme } = useTheme();
  const { settings, updateSetting } = useSettings();
  const textareaRef = useRef(null);

  useEffect(() => {
    const updateCursorPosition = () => {
      if (textareaRef.current && settings.displayLineNumbers) {
        const textarea = textareaRef.current;
        const text = textarea.value;
        const cursorPos = textarea.selectionStart;
        const textBeforeCursor = text.substring(0, cursorPos);
        const line = textBeforeCursor.split('\n').length;
        const lastLineStart = textBeforeCursor.lastIndexOf('\n') + 1;
        const column = cursorPos - lastLineStart + 1;
        setCursorPosition({ line, column });
      }
    };

    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.addEventListener('keyup', updateCursorPosition);
      textarea.addEventListener('click', updateCursorPosition);
      return () => {
        textarea.removeEventListener('keyup', updateCursorPosition);
        textarea.removeEventListener('click', updateCursorPosition);
      };
    }
  }, [settings.displayLineNumbers, note?.content]);

  useEffect(() => {
    setIsPreviewMode(settings.markdownPreview);
  }, [settings.markdownPreview]);

  const handlePreviewToggle = () => {
    const newPreviewMode = !isPreviewMode;
    setIsPreviewMode(newPreviewMode);
    updateSetting('markdownPreview', newPreviewMode);
  };

  const handleTitleChange = (e) => {
    onNoteUpdate({
      ...note,
      title: e.target.value,
      updatedAt: new Date().toISOString()
    });
  };

  const handleContentChange = (e) => {
    onNoteUpdate({
      ...note,
      content: e.target.value,
      updatedAt: new Date().toISOString()
    });
  };

  const handleToggleFavorite = () => {
    onNoteUpdate({
      ...note,
      isFavorite: !note.isFavorite,
      updatedAt: new Date().toISOString()
    });
  };

  const handleDelete = () => {
    if (onNoteDelete) {
      onNoteDelete(note.id);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([note.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${note.title || 'Untitled'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(note.content);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  const renderPreview = () => {
    const lines = note.content.split('\n');
    return (
      <div className={styles.previewContent}>
        {lines.map((line, index) => {
          if (line.startsWith('# ')) {
            return <h1 key={index}>{line.substring(2)}</h1>;
          } else if (line.startsWith('## ')) {
            return <h2 key={index}>{line.substring(3)}</h2>;
          } else if (line.startsWith('### ')) {
            return <h3 key={index}>{line.substring(4)}</h3>;
          } else if (line.trim() === '') {
            return <br key={index} />;
          } else {
            return <p key={index}>{line}</p>;
          }
        })}
      </div>
    );
  };

  return (
    <div className={`${styles.editor} ${isDarkTheme ? styles.darkTheme : ''}`}>
      {note ? (
        <>
          <div className={styles.toolbar}>
            <input
              type="text"
              value={note.title}
              onChange={handleTitleChange}
              placeholder="Note title..."
              className={styles.titleInput}
            />
          </div>

          {isPreviewMode ? (
            renderPreview()
          ) : (
            <div className={styles.editorContainer}>
              {settings.displayLineNumbers && (
                <div className={styles.lineNumbers}>
                  {note.content.split('\n').map((_, index) => (
                    <div key={index} className={styles.lineNumber}>
                      {index + 1}
                    </div>
                  ))}
                </div>
              )}
              <textarea
                ref={textareaRef}
                value={note.content}
                onChange={handleContentChange}
                placeholder="Start writing your note..."
                className={styles.contentArea}
                style={{
                  paddingLeft: settings.displayLineNumbers ? '60px' : '20px'
                }}
              />
            </div>
          )}

          <div className={styles.footer}>
            <div className={styles.noteActionsLeft}>
              <button
                onClick={handlePreviewToggle}
                className={`${styles.footerButton} ${isPreviewMode ? styles.active : ''}`}
                title={isPreviewMode ? "Edit" : "Preview"}
              >
                {isPreviewMode ? '✏️' : '👁️'}
              </button>
              
              <button
                onClick={handleToggleFavorite}
                className={`${styles.footerButton} ${note.isFavorite ? styles.active : ''}`}
                title={note.isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {note.isFavorite ? '⭐' : '☆'}
              </button>
              
              <button
                onClick={handleDelete}
                className={styles.footerButton}
                title="Delete note"
              >
                🗑️
              </button>
              
              <button
                onClick={handleDownload}
                className={styles.footerButton}
                title="Download note"
              >
                ⬇️
              </button>
              
              <button
                onClick={handleCopy}
                className={styles.footerButton}
                title="Copy to clipboard"
              >
                📋
              </button>
            </div>

            <div className={styles.footerCenter}>
              <span>Last updated: {new Date(note.updatedAt).toLocaleString()}</span>
              {settings.displayLineNumbers && (
                <span className={styles.cursorInfo}>
                  Ln {cursorPosition.line}, Col {cursorPosition.column}
                </span>
              )}
            </div>
            
            <div className={styles.footerActions}>
              <button
                onClick={handleThemeToggle}
                className={`${styles.footerButton} ${isDarkTheme ? styles.active : ''}`}
                title="Toggle theme"
              >
                {isDarkTheme ? '☀️' : '🌙'}
              </button>
              
              <button
                onClick={handleSettings}
                className={styles.footerButton}
                title="Settings"
              >
                ⚙️
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.emptyState}>
            <h3>Select a note to start editing</h3>
            <p>Choose a note from the list or create a new one</p>
          </div>
          
          <div className={styles.footer}>
            <div className={styles.footerLeft}>
              <span>No note selected</span>
            </div>
            
            <div className={styles.footerCenter}>
            </div>
            
            <div className={styles.footerActions}>
              <button
                onClick={handleThemeToggle}
                className={`${styles.footerButton} ${isDarkTheme ? styles.active : ''}`}
                title="Toggle theme"
              >
                {isDarkTheme ? '☀️' : '🌙'}
              </button>
              
              <button
                onClick={handleSettings}
                className={styles.footerButton}
                title="Settings"
              >
                ⚙️
              </button>
            </div>
          </div>
        </>
      )}

      <Settings isOpen={isSettingsOpen} onClose={handleCloseSettings} />
    </div>
  );
}

export default NoteEditor;
