import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import ListIcon from '@material-ui/icons/ListAlt';

import useArrayItemSelection from 'hooks/useArrayItemSelection';
import BigMessage from 'components/BigMessage';

import StepList from './StepList';
import StepEditor from './StepEditor/StepEditor';

import { DEFAULT_JOINT_VALUES } from '../../../joints';

const defaultStep = {
  ...DEFAULT_JOINT_VALUES,
  delay: 1000,
};

function StepListEditor({ routine, onChange }) {
  const [selectedStep, selectedIndex, setSelectedStep] = useArrayItemSelection(
    routine ? routine.steps : [],
    0
  );

  const handleStepSelect = (index) => {
    setSelectedStep(index);
  };

  const handleNewStep = () => {
    const lastStep =
      routine.steps.length >= 1
        ? routine.steps[routine.steps.length - 1]
        : null;

    const newStep = lastStep || defaultStep;

    const newRoutine = {
      ...routine,
      steps: [...routine.steps, newStep],
    };

    onChange(newRoutine);
    // selects the last step
    setSelectedStep(newRoutine.steps.length - 1);
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
    <Box padding={2}>
      <Grid container>
        <Grid item xs={6}>
          <StepList
            steps={routine.steps}
            activeItem={selectedIndex}
            onDelete={handleStepDelete}
            onEdit={handleStepSelect}
            onAdd={handleNewStep}
          />
        </Grid>

        <Grid item xs={6}>
          {selectedStep === null ? (
            <Box height="100%">
              {routine.steps ? (
                <BigMessage
                  IconComponent={ListIcon}
                  message="Nessuno step selezionato"
                  suggestion="Puoi selezionarne uno dal pannello a sinistra"
                />
              ) : (
                <BigMessage
                  IconComponent={ListIcon}
                  message="Non ci sono step"
                  suggestion="Puoi crearne uno dal pannello a sinistra"
                />
              )}
            </Box>
          ) : (
            <Box padding={2}>
              <StepEditor step={selectedStep} onChange={handleStepChange} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default StepListEditor;
