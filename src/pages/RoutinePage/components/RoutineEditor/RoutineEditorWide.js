import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import RoutineEditorControls from './RoutineEditorControls';

import StepListEditor from './StepListEditor/StepListEditor';

function RoutineEditorWide({
  routine,

  // data changes
  onNameChange,
  onStepsChange,

  // name text field
  nameError,

  // submit and cancel buttons
  enableSubmit = false,
  enableCancel = false,
  onSubmit,
  onCancel,

  // optional actions
  showOptionalActions = false,
  enableRun = false,
  onDelete,
}) {
  return (
    <Grid container style={{ height: '100%' }}>
      {/* left left column */}
      <Grid item xs={3}>
        <Box padding={2}>
          <RoutineEditorControls
            routine={routine}
            // name text field
            nameError={nameError}
            onNameChange={onNameChange}
            // submit-cancel actions
            enableSubmit={enableSubmit}
            enableCancel={enableCancel}
            onSubmit={onSubmit}
            onCancel={onCancel}
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
  );
}

export default RoutineEditorWide;
