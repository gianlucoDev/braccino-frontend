import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import LabelSliderNumberCombo from './LabelSliderNumberCombo';

function PositionInput({ position, onChange }) {
  const min = -500;
  const max = +500;

  const handleChange = (axis) => (newValue) => {
    onChange({
      ...position,
      [axis]: newValue,
    });
  };

  return (
    <Paper>
      <Box padding={2}>
        <Typography variant="h4" gutterBottom>
          Posizione
        </Typography>

        <Grid container>
          {['x', 'y', 'z'].map((axis) => (
            <LabelSliderNumberCombo
              key={axis}
              label={axis}
              min={min}
              max={max}
              value={position[axis]}
              onChange={handleChange(axis)}
            />
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}

export default PositionInput;
