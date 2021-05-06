import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SWRConfig } from 'swr';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';

import fetcher from './fetcher';

import DarkModeProvider from './components/DarkModeProvider';
import MuiThemeProvider from './components/MuiThemeProvider';

import BraccioAppBar from './components/BraccioAppBar';
import MainPage from './pages/MainPage/MainPage';
import EditRoutinePage from './pages/RoutinePage/RoutinePage';

function App() {
  return (
    <Router>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <DarkModeProvider>
          <MuiThemeProvider>
            <CssBaseline />
            <Box height="100%" display="flex" flexDirection="column">
              <Box flexShrink={1}>
                <BraccioAppBar />
              </Box>
              <Box flexGrow={1}>
                <Switch>
                  <Route
                    path="/routines/new"
                    render={() => <EditRoutinePage createNew />}
                  />
                  <Route
                    path="/routines/:id"
                    render={({ match: { params } }) => (
                      <EditRoutinePage id={params.id} />
                    )}
                  />
                  <Route path="/" children={<MainPage />} />
                </Switch>
              </Box>
            </Box>
          </MuiThemeProvider>
        </DarkModeProvider>
      </SWRConfig>
    </Router>
  );
}

export default App;
