import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useArrayItemSelection from 'hooks/useArrayItemSelection';
import BigMessage from 'components/BigMessage';

import StepList from './StepList';
import StepEditor from './StepEditor';

import ListIcon from '@material-ui/icons/ListAlt';

import { DEFAULT_JOINT_VALUES } from '../joints';

function StepListEditor({ routine, onChange }) {
  const [selectedStep, setSelectedStep, selectedIndex] = useArrayItemSelection(
    routine ? routine.steps : [],
    0
  );

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
    <Box padding={2}>
      <Typography variant="h4">
        Steps
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Box>
            <StepList
              steps={routine.steps}
              activeItem={selectedIndex}
              onDelete={handleStepDelete}
              onEdit={handleStepSelect}
              onAdd={handleNewStep}
            />
          </Box>
        </Grid>

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
    </Box>
  );
}

export default StepListEditor;
