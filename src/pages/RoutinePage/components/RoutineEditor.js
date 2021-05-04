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
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <RoutineEditorControls
          name={routine.name}
          nameError={nameError}
          nameHelperText={nameError ? 'Nome richisto' : undefined}
          enableSubmitCancel={enableSubmitCancel && !nameError}
          onNameChange={handleNameChange}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
        <StepList
          steps={routine.steps}
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
  );
}

export default RoutineEditor;
