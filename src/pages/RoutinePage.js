import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import StepList from '../components/StepList';
import StepEditor from '../components/StepEditor';

function RoutinePage() {
  const { id } = useParams();
  const { data, error } = useSWR(`/routines/${id}`);
  const [selectedStep, setSelectedStep] = useState(null);

  if (error) {
    return <Typography variant="h3">Error.</Typography>;
  }

  if (!data) {
    return <Typography variant="h3">Loading...</Typography>;
  }

  const { steps } = data;

  return (
    <Box padding={2}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <StepList
            steps={steps}
            onEdit={(index) => setSelectedStep(index)}
            onAdd={() => alert('non ancora implementato')}
          />
        </Grid>
        <Grid item xs={8}>
          {selectedStep === null ? (
            <Typography variant="h3">
              Seleziona uno step nel pannello a sinistra
            </Typography>
          ) : (
            <StepEditor />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default RoutinePage;
