import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import BraccioAppBar from 'components/BraccioAppBar';
import BraccioList from './components/BraccioList';
import RoutineList from './components/RoutineList';

function MainPage() {
  return (
    <>
      <BraccioAppBar />
      <Box marginTop={2}>
        <Container>
          <Typography gutterBottom variant="h3" component="h1">
            Bracci collegati
          </Typography>
          <BraccioList />

          <Typography gutterBottom variant="h3" component="h1">
            Routine disponibili
          </Typography>
          <RoutineList />
        </Container>
      </Box>
    </>
  );
}

export default MainPage;
