import { useContext } from 'react';
import { darkModeContext } from '../components/DarkModeProvider';

function useDarkMode() {
  const { isDarkMode, setDarkMode } = useContext(darkModeContext);
  return { isDarkMode, setDarkMode };
}

export default useDarkMode;
