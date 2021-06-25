import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import StepList from '../StepList';
import StepEditor from '../StepEditor';
import StepListEditorMobile from './StepListEditorMobile';

function StepListEditor() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));

  if (mobile) {
    return <StepListEditorMobile />;
  }

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

export default StepListEditor;
