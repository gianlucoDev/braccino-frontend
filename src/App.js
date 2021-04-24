import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SWRConfig } from 'swr';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import fetcher from './fetcher';
import BraccioAppBar from './components/BraccioAppBar';

import MainPage from './pages/MainPage';
import RoutinePage from './pages/RoutinePage';

function App() {
  return (
    <Router>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <CssBaseline />
        <BraccioAppBar />
        <Box marginTop={2}>
          <Container>
            <Switch>
              <Route path="/routines/:id" children={<RoutinePage />} />
              <Route path="/" children={<MainPage />} />
            </Switch>
          </Container>
        </Box>
      </SWRConfig>
    </Router>
  );
}

export default App;
