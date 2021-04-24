import useSWR from 'swr';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import BraccioList from './components/BraccioList';
import RoutineList from './components/RoutineList';

function MainPage() {
  const { data: braccios, error: bracciosError } = useSWR('/braccio');
  const { data: routines, error: routinesError } = useSWR('/routines');

  if (bracciosError || routinesError) {
    return <Typography variant="h3">Error.</Typography>;
  }

  if (!braccios || !routines) {
    return <Typography variant="h3">Loading...</Typography>;
  }

  return (
    <Box marginTop={2}>
      <Container>
        <Typography gutterBottom variant="h3" component="h1">
          Bracci collegati
        </Typography>
        <BraccioList braccios={braccios} />

        <Typography gutterBottom variant="h3" component="h1">
          Routine disponibili
        </Typography>
        <RoutineList routines={routines} />
      </Container>
    </Box>
  );
}

export default MainPage;
