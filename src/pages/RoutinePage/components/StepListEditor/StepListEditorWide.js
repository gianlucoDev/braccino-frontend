import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import StepList from '../StepList';
import StepEditor from '../StepEditor';

function StepListEditorWide() {
  return (
    <Box padding={2}>
      <Grid container>
        <Grid item xs={6}>
          <StepList />
        </Grid>

        <Grid item xs={6}>
          <Box height="100%" padding={2}>
            <StepEditor />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StepListEditorWide;
