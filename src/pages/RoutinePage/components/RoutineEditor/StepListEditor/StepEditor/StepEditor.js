import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import StepPositionSliders from 'components/StepPositionSliders/StepPositionSliders';
import LabelNumberCombo from './LabelNumberCombo';

function StepEditor({ step, onChange }) {
  const handleChange = (key) => (value) => {
    onChange({
      ...step,
      [key]: value,
    });
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
          value={step['delay']}
          onChange={handleChange('delay')}
        />

        <LabelNumberCombo
          label="Speed"
          min={10}
          max={30}
          value={step['speed']}
          onChange={handleChange('speed')}
        />

        <StepPositionSliders
          position={step.position}
          onChange={handleChange('position')}
        />
      </Box>
    </Paper>
  );
}

export default StepEditor;
