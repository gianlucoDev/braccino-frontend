import { createContext, useContext } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useLocalStorage from '../hooks/useLocalStorage';

const darkModeContext = createContext({});

function useDarkMode() {
  const { isDarkMode, setDarkMode } = useContext(darkModeContext);
  return { isDarkMode, setDarkMode };
}

function DarkModeProvider({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [manualDarkMode, setManualDarkMode] = useLocalStorage('dark-mode');

  const isDarkMode =
    manualDarkMode === 'yes' || (manualDarkMode === null && prefersDarkMode);

  const setDarkMode = (active) => {
    setManualDarkMode(active ? 'yes' : 'no');
  };

  return (
    <darkModeContext.Provider value={{ isDarkMode, setDarkMode }}>
      {children}
    </darkModeContext.Provider>
  );
}

export default DarkModeProvider;
export { useDarkMode };
