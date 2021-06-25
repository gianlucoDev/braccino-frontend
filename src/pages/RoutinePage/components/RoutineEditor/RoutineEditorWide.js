import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import BraccioAppBar from 'components/BraccioAppBar';

import RoutineImportExportButton from '../ImportExportButton';
import RoutineEditorControls from './RoutineEditorControls';
import StepListEditor from '../StepListEditor';

function RoutineEditorWide() {
  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box flexShrink={1}>
        <BraccioAppBar extraButtons={<RoutineImportExportButton />} />
      </Box>
      <Box flexGrow={1}>
        <Grid container style={{ height: '100%' }}>
          {/* left left column */}
          <Grid item xs={3}>
            <Box padding={2}>
              <RoutineEditorControls />
            </Box>
          </Grid>

          <Grid item xs={9}>
            <StepListEditor />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default RoutineEditorWide;
