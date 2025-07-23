import React, { useState } from 'react';
import styles from './Settings.module.css';
import { useTheme } from '../../context/ThemeContext';
import { useSettings } from '../../context/SettingsContext';

function Settings({ isOpen, onClose }) {
  const { isDarkTheme, toggleTheme } = useTheme();
  const { settings, toggleSetting } = useSettings();
  const [activeSection, setActiveSection] = useState('preferences');

  const handleDownloadAllNotes = () => {
    const notes = JSON.parse(localStorage.getItem('notepad-notes') || '[]');
    
    const allNotesContent = notes.map(note => 
      `# ${note.title || 'Untitled'}\n\n${note.content}\n\n---\n\n`
    ).join('');
    
    const element = document.createElement('a');
    const file = new Blob([allNotesContent], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'all-notes.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'preferences':
        return (
          <>
            <h2>Preferences</h2>
            
            <div className={styles.settingGroup}>
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <h3>Display line numbers</h3>
                  <p>Controls whether the editor should display line numbers</p>
                </div>
                <label className={styles.toggle}>
                  <input 
                    type="checkbox" 
                    checked={settings.displayLineNumbers}
                    onChange={() => toggleSetting('displayLineNumbers')}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <h3>Markdown preview</h3>
                  <p>Controls whether markdown preview mode is enabled</p>
                </div>
                <label className={styles.toggle}>
                  <input 
                    type="checkbox" 
                    checked={settings.markdownPreview}
                    onChange={() => toggleSetting('markdownPreview')}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <h3>Dark mode</h3>
                  <p>Controls the application theme</p>
                </div>
                <label className={styles.toggle}>
                  <input 
                    type="checkbox" 
                    checked={isDarkTheme}
                    onChange={toggleTheme}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </>
        );

      case 'shortcuts':
        return (
          <>
            <h2>Keyboard shortcuts</h2>
            
            <div className={styles.shortcutGroup}>
              <div className={styles.shortcutItem}>
                <span>Create a new note</span>
                <div className={styles.shortcutKeys}>
                  <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>N</kbd>
                </div>
              </div>
              
              <div className={styles.shortcutItem}>
                <span>Delete a note</span>
                <div className={styles.shortcutKeys}>
                  <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>U</kbd>
                </div>
              </div>
              
              <div className={styles.shortcutItem}>
                <span>Create a category</span>
                <div className={styles.shortcutKeys}>
                  <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>C</kbd>
                </div>
              </div>
              
              <div className={styles.shortcutItem}>
                <span>Download a note</span>
                <div className={styles.shortcutKeys}>
                  <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>O</kbd>
                </div>
              </div>
              
              <div className={styles.shortcutItem}>
                <span>Sync all notes</span>
                <div className={styles.shortcutKeys}>
                  <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>L</kbd>
                </div>
              </div>
              
              <div className={styles.shortcutItem}>
                <span>Markdown preview</span>
                <div className={styles.shortcutKeys}>
                  <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>P</kbd>
                </div>
              </div>
              
              <div className={styles.shortcutItem}>
                <span>Toggle theme</span>
                <div className={styles.shortcutKeys}>
                  <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>K</kbd>
                </div>
              </div>
              
              <div className={styles.shortcutItem}>
                <span>Search notes</span>
                <div className={styles.shortcutKeys}>
                  <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>F</kbd>
                </div>
              </div>
              
              <div className={styles.shortcutItem}>
                <span>Prettify a note</span>
                <div className={styles.shortcutKeys}>
                  <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>I</kbd>
                </div>
              </div>
            </div>
          </>
        );

      case 'data':
        return (
          <>
            <h2>Data management</h2>
            
            <div className={styles.dataSection}>
              <p>Download all notes as Markdown files in a zip.</p>
              <button className={styles.primaryButton} onClick={handleDownloadAllNotes}>
                📥 Download all notes
              </button>
            </div>
          </>
        );

      case 'about':
        return (
          <>
            <h2>About NotePad</h2>
            
            <div className={styles.aboutContent}>
              <p>
                NotePad is a minimalist note-taking web app for developers. Write in plain text 
                or Markdown in an IDE-like environment.
              </p>
              
              <p>
                This app has no tracking or analytics and does not retain any user data. Notes 
                are persisted in local storage and can be downloaded as Markdown files from 
                the data management tab.
              </p>
              
              <p>
                NotePad was created as a simple and efficient note-taking solution with the help of modern web technologies.
              </p>
              
              <button className={styles.primaryButton}>
                👁️ View source
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null; 

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={`${styles.modal} ${isDarkTheme ? styles.darkTheme : ''}`}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Demo User</span>
            <button className={styles.logoutButton}>Log out</button>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.sidebar}>
            <div 
              className={`${styles.sidebarItem} ${activeSection === 'preferences' ? styles.active : ''}`}
              onClick={() => setActiveSection('preferences')}
            >
              <span className={styles.icon}>⚙</span>
              <span>Preferences</span>
            </div>
            <div 
              className={`${styles.sidebarItem} ${activeSection === 'shortcuts' ? styles.active : ''}`}
              onClick={() => setActiveSection('shortcuts')}
            >
              <span className={styles.icon}>⌨</span>
              <span>Keyboard shortcuts</span>
            </div>
            <div 
              className={`${styles.sidebarItem} ${activeSection === 'data' ? styles.active : ''}`}
              onClick={() => setActiveSection('data')}
            >
              <span className={styles.icon}>📊</span>
              <span>Data management</span>
            </div>
            <div 
              className={`${styles.sidebarItem} ${activeSection === 'about' ? styles.active : ''}`}
              onClick={() => setActiveSection('about')}
            >
              <span className={styles.icon}>ℹ</span>
              <span>About NotePad</span>
            </div>
          </div>

          <div className={styles.main}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
