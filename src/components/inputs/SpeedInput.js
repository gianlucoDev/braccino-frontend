import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import LabelSliderNumberCombo from './LabelSliderNumberCombo';

function SpeedInput({ speed, onChange }) {
  return (
    <Paper>
      <Box padding={2}>
        <Typography variant="h4" gutterBottom>
          Velocità
        </Typography>

        <LabelSliderNumberCombo
          label="Velocità"
          min={10}
          max={30}
          value={speed}
          onChange={onChange}
        />
      </Box>
    </Paper>
  );
}

export default SpeedInput;
