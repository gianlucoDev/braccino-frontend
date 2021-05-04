import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SWRConfig } from 'swr';
import CssBaseline from '@material-ui/core/CssBaseline';

import fetcher from './fetcher';

import DarkModeProvider from './components/DarkModeProvider';
import MuiThemeProvider from './components/MuiThemeProvider';

import BraccioAppBar from './components/BraccioAppBar';
import MainPage from './pages/MainPage/MainPage';
import NewRoutinePage from './pages/RoutinePage/NewRoutinePage';
import EditRoutinePage from './pages/RoutinePage/EditRoutinePage';

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
            <BraccioAppBar />
            <Switch>
              <Route path="/routines/new" children={<NewRoutinePage />} />
              <Route path="/routines/:id" children={<EditRoutinePage />} />
              <Route path="/" children={<MainPage />} />
            </Switch>
          </MuiThemeProvider>
        </DarkModeProvider>
      </SWRConfig>
    </Router>
  );
}

export default App;
