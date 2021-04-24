import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useDirtyData from '../../hooks/useDirtyData';
import RoutineEditorControls from './components/RoutineEditorControls';
import StepList from './components/StepList';
import StepEditor from './components/StepEditor';

import { DEFAULT_JOINT_VALUES } from './joints';

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

  const handleNewStep = () => {
    const newStep = {
      ...DEFAULT_JOINT_VALUES,
      delay: 1000,
    };

    setState({
      ...state,
      steps: [...state.steps, newStep],
    });
  };

  const handleReset = () => {
    // when we reset the data some steps may get deleted
    // this ensures that those steps are not selected when resetting
    if (selectedStep >= data.steps.length) {
      setSelectedStep(null);
    }

    reset();
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
            onCancel={handleReset}
          />
          <StepList
            steps={steps}
            activeItem={selectedStep}
            onEdit={(index) => setSelectedStep(index)}
            onAdd={handleNewStep}
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
