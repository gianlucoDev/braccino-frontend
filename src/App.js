import { Router, Switch, Route } from 'react-router-dom';
import { SWRConfig } from 'swr';
import CssBaseline from '@material-ui/core/CssBaseline';

import fetcher from './api/fetcher';

import DarkModeProvider from './components/DarkModeProvider';
import MuiThemeProvider from './components/MuiThemeProvider';

import MainPage from './pages/MainPage/MainPage';
import BraccioPage from 'pages/BraccioPage/BraccioPage';
import RoutinePage from './pages/RoutinePage/RoutinePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import history from './history';

function App() {
  return (
    <Router history={history}>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <DarkModeProvider>
          <MuiThemeProvider>
            <CssBaseline />

            <Switch>
              <Route exact path="/" children={<MainPage />} />
              <Route
                path="/braccio/:serial_number"
                children={<BraccioPage />}
              />
              <Route
                path="/routines/new"
                render={() => <RoutinePage createNew />}
              />
              <Route
                path="/routines/:id"
                render={({ match: { params } }) => (
                  <RoutinePage id={params.id} />
                )}
              />
              <Route children={<NotFoundPage />} />
            </Switch>
          </MuiThemeProvider>
        </DarkModeProvider>
      </SWRConfig>
    </Router>
  );
}

export default App;
