import { useState } from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import SliderTextInputCombo from './SliderTextInputCombo';

const SETTINGS = {
  m1: {
    min: 0,
    max: 180,
    default: 90,
  },
  m2: {
    min: 15,
    max: 165,
    default: 45,
  },
  m3: {
    min: 0,
    max: 180,
    default: 180,
  },
  m4: {
    min: 0,
    max: 180,
    default: 180,
  },
  m5: {
    min: 0,
    max: 180,
    default: 90,
  },
  m6: {
    min: 10,
    max: 73,
    default: 10,
  },
};

const DEFAULT_VALUES = Object.fromEntries(
  Object.keys(SETTINGS).map((key) => [key, SETTINGS[key].default])
);

function StepEditor() {
  const [values, setValues] = useState(DEFAULT_VALUES);

  const handleChange = (key) => (value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  return (
    <Paper>
      <Box padding={2}>
        <Typography variant="h4" gutterBottom>
          Valori step
        </Typography>

        {Object.entries(SETTINGS).map(([key, settings]) => (
          <SliderTextInputCombo
            key={key}
            label={key.toUpperCase()}
            min={settings.min}
            max={settings.max}
            value={values[key]}
            onChange={handleChange(key)}
          />
        ))}
      </Box>
    </Paper>
  );
}

export default StepEditor;
