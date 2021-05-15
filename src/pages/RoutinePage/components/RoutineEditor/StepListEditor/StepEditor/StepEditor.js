import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import LabelSliderNumberCombo from './LabelSliderNumberCombo';
import LabelNumberCombo from './LabelNumberCombo';

import { JOINTS } from '../../../../joints';

function StepEditor({ step, onChange }) {
  const handleChange = (key) => (value) => {
    onChange({
      ...step,
      [key]: value,
    });
  };

  const handlePositionChange = (key) => (value) => {
    onChange({
      ...step,
      position: {
        ...step.position,
        [key]: value,
      },
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

        {Object.entries(JOINTS).map(([key, joint]) => (
          <LabelSliderNumberCombo
            key={key}
            label={JOINTS[key].name}
            min={joint.min}
            max={joint.max}
            value={step.position[key]}
            onChange={handlePositionChange(key)}
          />
        ))}
      </Box>
    </Paper>
  );
}

export default StepEditor;
