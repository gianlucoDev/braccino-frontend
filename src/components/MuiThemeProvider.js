import { useMemo } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useDarkMode from '../hooks/useDarkMode';

function MuiThemeProvider({ children }) {
  const { isDarkMode } = useDarkMode();

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: isDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default MuiThemeProvider;
