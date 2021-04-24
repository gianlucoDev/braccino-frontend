import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useDirtyData from '../hooks/useDirtyData';
import RoutineEditorControls from '../components/RoutineEditorControls';
import StepList from '../components/StepList';
import StepEditor from '../components/StepEditor';

function RoutinePage() {
  const { id } = useParams();
  const { data, error } = useSWR(`/routines/${id}`);
  const [state, setState, dirty, reset] = useDirtyData({ original: data });
  const [selectedStep, setSelectedStep] = useState(null);

  const handleStepChange = (newStep) => {
    const newSteps = [...steps];
    newSteps[selectedStep] = newStep;

    const newState = {
      ...state,
      steps: newSteps,
    };

    setState(newState);
  };

  const handleNameChange = (event) => {
    setState({
      ...state,
      name: event.target.value,
    });
  };

  if (error) {
    return <Typography variant="h3">Error.</Typography>;
  }

  if (!state) {
    return <Typography variant="h3">Loading...</Typography>;
  }

  const { name, steps } = state;

  return (
    <Box padding={2}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <RoutineEditorControls
            name={name}
            onNameChange={handleNameChange}
            dirty={dirty}
            onSubmit={() => alert('non ancora implementato')}
            onCancel={() => reset()}
          />
          <StepList
            steps={steps}
            activeItem={selectedStep}
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
            <StepEditor
              key={selectedStep}
              step={steps[selectedStep]}
              onChange={handleStepChange}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default RoutinePage;
