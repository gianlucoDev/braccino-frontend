import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import StepList from '../components/StepList';

function RoutinePage() {
  const { id } = useParams();
  const { data, error } = useSWR(`/routines/${id}`);

  if (error) {
    return <Typography variant="h3">Error.</Typography>;
  }

  if (!data) {
    return <Typography variant="h3">Loading...</Typography>;
  }

  const { name, steps } = data;
  console.log(steps[0]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <StepList
          steps={steps}
          onEdit={() => alert('non ancora implementato')}
          onAdd={() => alert('non ancora implementato')}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">Selezione un elemento a sinistra</Typography>
      </Grid>
    </Grid>
  );
}

export default RoutinePage;
