import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useDirtyData from '../../hooks/useDirtyData';
import useArrayItemSelection from '../../hooks/useArrayItemSelection';
import RoutineEditorControls from './components/RoutineEditorControls';
import StepList from './components/StepList';
import StepEditor from './components/StepEditor';

import { DEFAULT_JOINT_VALUES } from './joints';

function RoutinePage() {
  const { id } = useParams();
  const { data, error } = useSWR(`/routines/${id}`);
  const [state, setState, dirty, reset] = useDirtyData({ original: data });
  const [selectedStep, setSelectedStep, selectedIndex] = useArrayItemSelection(
    state ? state.steps : []
  );

  const handleStepChange = (newStep) => {
    const newSteps = [...steps];
    newSteps[selectedIndex] = newStep;

    const newState = {
      ...state,
      steps: newSteps,
    };

    setState(newState);
  };

  const handleStepDelete = (index) => {
    const newSteps = [...state.steps];
    newSteps.splice(index, 1);

    setState({
      ...state,
      steps: newSteps,
    });
  };

  const handleStepSelect = (index) => {
    setSelectedStep(index);
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
            activeItem={selectedIndex}
            onDelete={handleStepDelete}
            onEdit={handleStepSelect}
            onAdd={handleNewStep}
          />
        </Grid>
        <Grid item xs={8}>
          {selectedStep === null ? (
            <Typography variant="h3">
              Seleziona uno step nel pannello a sinistra
            </Typography>
          ) : (
            <StepEditor step={selectedStep} onChange={handleStepChange} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default RoutinePage;
