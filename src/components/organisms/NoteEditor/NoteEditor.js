import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Icon, Text } from '../../atoms';
import { useTheme } from '../../../context/ThemeContext';
import { useSettings } from '../../../context/SettingsContext';
import Settings from '../Settings/Settings';
import styles from './NoteEditor.module.css';

const NoteEditor = ({ note, onNoteUpdate, onNoteDelete }) => {
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
            <Input
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
              <Button
                variant="icon"
                onClick={handlePreviewToggle}
                title={isPreviewMode ? "Edit" : "Preview"}
                className={isPreviewMode ? styles.active : ''}
              >
                <Icon name={isPreviewMode ? 'edit' : 'eye'} />
              </Button>
              
              <Button
                variant="icon"
                onClick={handleToggleFavorite}
                title={note.isFavorite ? "Remove from favorites" : "Add to favorites"}
                className={note.isFavorite ? styles.active : ''}
              >
                <Icon name={note.isFavorite ? 'star' : 'star-outline'} />
              </Button>
              
              <Button
                variant="icon"
                onClick={handleDelete}
                title="Delete note"
              >
                <Icon name="trash" />
              </Button>
              
              <Button
                variant="icon"
                onClick={handleDownload}
                title="Download note"
              >
                <Icon name="download" />
              </Button>
              
              <Button
                variant="icon"
                onClick={handleCopy}
                title="Copy to clipboard"
              >
                <Icon name="copy" />
              </Button>
            </div>

            <div className={styles.footerCenter}>
              <Text variant="caption" color="muted">
                Last updated: {new Date(note.updatedAt).toLocaleString()}
              </Text>
              {settings.displayLineNumbers && (
                <Text variant="caption" color="muted" className={styles.cursorInfo}>
                  Ln {cursorPosition.line}, Col {cursorPosition.column}
                </Text>
              )}
            </div>
            
            <div className={styles.footerActions}>
              <Button
                variant="icon"
                onClick={toggleTheme}
                title="Toggle theme"
                className={isDarkTheme ? styles.active : ''}
              >
                <Icon name={isDarkTheme ? 'sun' : 'moon'} />
              </Button>
              
              <Button
                variant="icon"
                onClick={handleSettings}
                title="Settings"
              >
                <Icon name="settings" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.emptyState}>
            <Text variant="heading3">Select a note to start editing</Text>
            <Text variant="body" color="muted">Choose a note from the list or create a new one</Text>
          </div>
          
          <div className={styles.footer}>
            <div className={styles.footerLeft}>
              <Text variant="caption" color="muted">No note selected</Text>
            </div>
            
            <div className={styles.footerCenter}>
            </div>
            
            <div className={styles.footerActions}>
              <Button
                variant="icon"
                onClick={toggleTheme}
                title="Toggle theme"
                className={isDarkTheme ? styles.active : ''}
              >
                <Icon name={isDarkTheme ? 'sun' : 'moon'} />
              </Button>
              
              <Button
                variant="icon"
                onClick={handleSettings}
                title="Settings"
              >
                <Icon name="settings" />
              </Button>
            </div>
          </div>
        </>
      )}

      <Settings isOpen={isSettingsOpen} onClose={handleCloseSettings} />
    </div>
  );
};

export default NoteEditor;
