import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SWRConfig } from 'swr';
import CssBaseline from '@material-ui/core/CssBaseline';

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
        <Switch>
          <Route path="/routines/:id" children={<RoutinePage />} />
          <Route path="/" children={<MainPage />} />
        </Switch>
      </SWRConfig>
    </Router>
  );
}

export default App;
