import React, { useState } from 'react';
import { Button, Text } from '../../atoms';
import { useTheme } from '../../../context/ThemeContext';
import { useSettings } from '../../../context/SettingsContext';
import styles from './Settings.module.css';

const Settings = ({ isOpen, onClose }) => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const { settings, toggleSetting } = useSettings();
  const [activeSection, setActiveSection] = useState('preferences');

  if (!isOpen) return null;

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
            <Text variant="heading2">Preferences</Text>
            
            <div className={styles.settingGroup}>
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <Text variant="body" weight="medium-weight">Display line numbers</Text>
                  <Text variant="caption" color="muted">Controls whether the editor should display line numbers</Text>
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
                  <Text variant="body" weight="medium-weight">Markdown preview</Text>
                  <Text variant="caption" color="muted">Controls whether markdown preview mode is enabled</Text>
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
                  <Text variant="body" weight="medium-weight">Dark mode</Text>
                  <Text variant="caption" color="muted">Controls the application theme</Text>
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
            <Text variant="heading2">Keyboard shortcuts</Text>
            
            <div className={styles.shortcutGroup}>
              <div className={styles.shortcutItem}>
                <Text variant="body">Create a new note</Text>
                <div className={styles.shortcutKeys}>
                  <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>N</kbd>
                </div>
              </div>
              
              <div className={styles.shortcutItem}>
                <Text variant="body">Delete a note</Text>
                <div className={styles.shortcutKeys}>
                  <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>U</kbd>
                </div>
              </div>

              <div className={styles.shortcutItem}>
                <Text variant="body">Toggle preview</Text>
                <div className={styles.shortcutKeys}>
                  <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>P</kbd>
                </div>
              </div>

              <div className={styles.shortcutItem}>
                <Text variant="body">Toggle favorite</Text>
                <div className={styles.shortcutKeys}>
                  <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>F</kbd>
                </div>
              </div>

              <div className={styles.shortcutItem}>
                <Text variant="body">Download note</Text>
                <div className={styles.shortcutKeys}>
                  <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>D</kbd>
                </div>
              </div>

              <div className={styles.shortcutItem}>
                <Text variant="body">Copy to clipboard</Text>
                <div className={styles.shortcutKeys}>
                  <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>C</kbd>
                </div>
              </div>
            </div>
          </>
        );

      case 'backup':
        return (
          <>
            <Text variant="heading2">Backup & Export</Text>
            
            <div className={styles.backupGroup}>
              <div className={styles.backupItem}>
                <Text variant="body" weight="medium-weight">Download all notes</Text>
                <Text variant="caption" color="muted">Export all your notes as a single Markdown file</Text>
                <Button onClick={handleDownloadAllNotes} variant="primary" className={styles.downloadButton}>
                  Download All Notes
                </Button>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`${styles.overlay} ${isDarkTheme ? styles.darkTheme : ''}`}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <Text variant="heading2">Settings</Text>
          <Button variant="icon" onClick={onClose} className={styles.closeButton}>
            ×
          </Button>
        </div>

        <div className={styles.content}>
          <div className={styles.sidebar}>
            <Button
              variant={activeSection === 'preferences' ? 'primary' : 'ghost'}
              onClick={() => setActiveSection('preferences')}
              className={styles.sidebarButton}
            >
              Preferences
            </Button>
            <Button
              variant={activeSection === 'shortcuts' ? 'primary' : 'ghost'}
              onClick={() => setActiveSection('shortcuts')}
              className={styles.sidebarButton}
            >
              Shortcuts
            </Button>
            <Button
              variant={activeSection === 'backup' ? 'primary' : 'ghost'}
              onClick={() => setActiveSection('backup')}
              className={styles.sidebarButton}
            >
              Backup
            </Button>
          </div>

          <div className={styles.main}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
