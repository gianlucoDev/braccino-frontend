import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useArrayItemSelection from '../../../hooks/useArrayItemSelection';
import RoutineEditorControls from './RoutineEditorControls';
import StepList from './StepList';
import StepEditor from './StepEditor';

import { DEFAULT_JOINT_VALUES } from '../joints';

function RoutineEditor({
  routine,
  enableSubmitCancel,
  onChange,
  onSubmit,
  onCancel,
  onDelete,
}) {
  const [selectedStep, setSelectedStep, selectedIndex] = useArrayItemSelection(
    routine ? routine.steps : []
  );
  const nameError = enableSubmitCancel && !routine.name;

  const handleNameChange = (event) => {
    onChange({
      ...routine,
      name: event.target.value,
    });
  };

  const handleStepSelect = (index) => {
    setSelectedStep(index);
  };

  const handleNewStep = () => {
    const newStep = {
      ...DEFAULT_JOINT_VALUES,
      delay: 1000,
    };

    onChange({
      ...routine,
      steps: [...routine.steps, newStep],
    });
  };

  const handleStepChange = (newStep) => {
    const newSteps = [...routine.steps];
    newSteps[selectedIndex] = newStep;

    const newState = {
      ...routine,
      steps: newSteps,
    };

    onChange(newState);
  };

  const handleStepDelete = (index) => {
    const newSteps = [...routine.steps];
    newSteps.splice(index, 1);

    onChange({
      ...routine,
      steps: newSteps,
    });
  };

  return (
    <Grid container style={{ height: '100%' }}>
      {/* left column */}
      <Grid item xs={6}>
        <Paper square style={{ height: '100%' }}>
          <Grid container>
            {/* left left column */}
            <Grid item xs={6}>
              <Box padding={2}>
                <Typography variant="h4" gutterBottom>
                  Routine
                </Typography>
                <RoutineEditorControls
                  name={routine.name}
                  nameError={nameError}
                  nameHelperText={nameError ? 'Nome richisto' : undefined}
                  enableSubmitCancel={enableSubmitCancel && !nameError}
                  onNameChange={handleNameChange}
                  onSubmit={onSubmit}
                  onCancel={onCancel}
                  onDelete={onDelete}
                />
              </Box>
            </Grid>

            {/* left right column */}
            <Grid item xs={6}>
              <Box paddingTop={2}>
                <Typography variant="h4" gutterBottom>
                  Steps
                </Typography>
                <StepList
                  steps={routine.steps}
                  activeItem={selectedIndex}
                  onDelete={handleStepDelete}
                  onEdit={handleStepSelect}
                  onAdd={handleNewStep}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Right column */}
      <Grid item xs={6}>
        <Box padding={2}>
          {selectedStep === null ? (
            <Typography variant="h3">
              Seleziona uno step dal pannello a sinistra
            </Typography>
          ) : (
            <StepEditor step={selectedStep} onChange={handleStepChange} />
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default RoutineEditor;
