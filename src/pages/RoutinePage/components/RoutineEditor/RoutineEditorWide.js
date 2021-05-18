import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import BraccioAppBar from 'components/BraccioAppBar';

import RoutineImportExportButton from './RoutineImportExportButton';
import RoutineEditorControls from './RoutineEditorControls';
import StepListEditor from './StepListEditor/StepListEditor';

function RoutineEditorWide({
  routine,
  dirty = false,

  // data changes
  onNameChange,
  onStepsChange,

  // optional actions
  showOptionalActions = false,
  enableRun = false,
  onDelete,
}) {
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
              <RoutineEditorControls
                routine={routine}
                dirty={dirty}
                // name text field
                onNameChange={onNameChange}
                // optional actions
                showOptionalActions={showOptionalActions}
                enableRun={enableRun}
                onDelete={onDelete}
              />
            </Box>
          </Grid>

          <Grid item xs={9}>
            <StepListEditor steps={routine.steps} onChange={onStepsChange} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default RoutineEditorWide;
