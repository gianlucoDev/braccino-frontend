import { useContext } from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import StepPositionSliders from 'components/StepPositionSliders/StepPositionSliders';
import LabelSliderNumberCombo from 'components/StepPositionSliders/LabelSliderNumberCombo';
import { RoutineStateContext } from 'pages/RoutinePage/RoutinePage';

import LabelNumberCombo from './LabelNumberCombo';

function StepEditor() {
  const { state, dispatch } = useContext(RoutineStateContext);
  const { routine, selectedStepIndex } = state;

  const selectedStep =
    selectedStepIndex !== null ? routine.steps[selectedStepIndex] : null;

  const handleStepChange = (key) => (value) => {
    const step = {
      ...selectedStep,
      [key]: value,
    };

    dispatch({ type: 'step-edit', step });
  };

  return (
    <Paper>
      <Box padding={2}>
        <Typography variant="h4" gutterBottom>
          Valori step
        </Typography>

        <LabelNumberCombo
          label="Delay"
          min={0}
          value={selectedStep['delay']}
          onChange={handleStepChange('delay')}
        />

        <LabelSliderNumberCombo
          label="Speed"
          min={10}
          max={30}
          value={selectedStep['speed']}
          onChange={handleStepChange('speed')}
        />

        <StepPositionSliders
          position={selectedStep.position}
          onChange={handleStepChange('position')}
        />
      </Box>
    </Paper>
  );
}

export default StepEditor;
