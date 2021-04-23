import { SWRConfig } from 'swr';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import fetcher from './fetcher';
import BraccioAppBar from './components/BraccioAppBar';

import MainPage from './pages/MainPage';

function App() {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <CssBaseline />
      <BraccioAppBar />
      <Box marginTop={2}>
        <Container>
          <MainPage />
        </Container>
      </Box>
    </SWRConfig>
  );
}

export default App;
