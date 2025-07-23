import React from 'react';
import { NotePadPage } from './components/pages';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <div className="App">
          <NotePadPage />
        </div>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
