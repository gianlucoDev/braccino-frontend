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

        {Object.entries(JOINTS).map(([key, joint]) => (
          <LabelSliderNumberCombo
            key={key}
            label={key.toUpperCase()}
            min={joint.min}
            max={joint.max}
            value={step[key]}
            onChange={handleChange(key)}
          />
        ))}
      </Box>
    </Paper>
  );
}

export default StepEditor;
