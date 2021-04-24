import useSWR from 'swr';

import Typography from '@material-ui/core/Typography';
import BraccioList from '../components/BraccioList';
import RoutineList from '../components/RoutineList';

function MainPage() {
  const { data: braccios, error: bracciosError } = useSWR('/braccio');
  const { data: routines, error: routinesError } = useSWR('/routines');

  if (bracciosError || routinesError) return <p>Error.</p>;
  if (!braccios || !routines) return <p>Loading...</p>;

  return (
    <>
      <Typography gutterBottom variant="h3" component="h1">
        Bracci collegati
      </Typography>
      <BraccioList braccios={braccios} />

      <Typography gutterBottom variant="h3" component="h1">
        Routine disponibili
      </Typography>
      <RoutineList routines={routines} />
    </>
  );
}

export default MainPage;
