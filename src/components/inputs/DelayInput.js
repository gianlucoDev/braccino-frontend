import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import LabelNumberCombo from './LabelNumberCombo';

function DelayInput({ delay, onChange }) {
  return (
    <Paper>
      <Box padding={2}>
        <Typography variant="h4" gutterBottom>
          Delay
        </Typography>

        <LabelNumberCombo
          label="Delay"
          min={0}
          value={delay}
          onChange={onChange}
        />
      </Box>
    </Paper>
  );
}

export default DelayInput;
