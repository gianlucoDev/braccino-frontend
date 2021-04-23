import { SWRConfig } from 'swr';
import CssBaseline from '@material-ui/core/CssBaseline';

import fetcher from './fetcher';
import MainPage from './pages/MainPage';

function App() {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <CssBaseline />
      <MainPage />
    </SWRConfig>
  );
}

export default App;
