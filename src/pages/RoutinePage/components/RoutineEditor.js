import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useArrayItemSelection from 'hooks/useArrayItemSelection';
import BigMessage from 'components/BigMessage';

import RoutineEditorControls from './RoutineEditorControls';
import StepList from './StepList';
import StepEditor from './StepEditor';

import ListIcon from '@material-ui/icons/ListAlt';

import { DEFAULT_JOINT_VALUES } from '../joints';

function RoutineEditor({
  routine,
  onChange,

  // name text field
  enableSubmit = false,
  enableCancel = false,
  onSubmit,
  onCancel,

  // optional actions
  showOptionalActions = false,
  enableRun = false,
  onDelete,
}) {
  const [selectedStep, setSelectedStep, selectedIndex] = useArrayItemSelection(
    routine ? routine.steps : [],
    0
  );
  const nameError = enableSubmit && !routine.name;

  const handleNameChange = (name) => {
    onChange({
      ...routine,
      name,
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
                  routine={routine}
                  // name text field
                  nameError={nameError}
                  onNameChange={handleNameChange}
                  // submit-cancel actions
                  enableSubmit={enableSubmit}
                  enableCancel={enableCancel}
                  onSubmit={onSubmit}
                  onCancel={onCancel}
                  // optional actions
                  showOptionalActions={showOptionalActions}
                  enableRun={enableRun}
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
        {selectedStep === null ? (
          <Box height="100%">
            <BigMessage
              IconComponent={ListIcon}
              message="Non ci sono step"
              suggestion="Puoi crearne uno dal pannello a sinistra"
            />
          </Box>
        ) : (
          <Box padding={2}>
            <StepEditor step={selectedStep} onChange={handleStepChange} />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default RoutineEditor;
