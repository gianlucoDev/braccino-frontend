import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import StepPositionSliders from 'components/StepPositionSliders/StepPositionSliders';

function BraccioPositionEditor({ position, onChange }) {
  return (
    <Paper>
      <Box padding={2}>
        <Typography variant="h4" gutterBottom>
          Posizione
        </Typography>

        <StepPositionSliders position={position} onChange={onChange} />
      </Box>
    </Paper>
  );
}

export default BraccioPositionEditor;
