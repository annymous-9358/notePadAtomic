import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    displayLineNumbers: false,
    markdownPreview: true
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('notepad-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notepad-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (settingName, value) => {
    setSettings(prev => ({
      ...prev,
      [settingName]: value
    }));
  };

  const toggleSetting = (settingName) => {
    setSettings(prev => ({
      ...prev,
      [settingName]: !prev[settingName]
    }));
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSetting,
      toggleSetting
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
