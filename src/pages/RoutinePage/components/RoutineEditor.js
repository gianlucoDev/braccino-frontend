import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import RoutineEditorControls from './RoutineEditorControls';

import StepListEditor from './StepListEditor';

function RoutineEditor({
  routine,
  onChange,

  // name text field
  enableSubmit = false,
  enableCancel = false,
  onSubmit,
  onCancel,

  // optional actions
  showOptionalActions = false,
  enableRun = false,
  onDelete,
}) {
  const nameError = enableSubmit && !routine.name;

  const handleNameChange = (name) => {
    onChange({
      ...routine,
      name,
    });
  };

  return (
    <Grid container style={{ height: '100%' }}>
      {/* left left column */}
      <Grid item xs={3}>
        <Box padding={2}>
          <Typography variant="h4" gutterBottom>
            Routine
          </Typography>

          <RoutineEditorControls
            routine={routine}
            // name text field
            nameError={nameError}
            onNameChange={handleNameChange}
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
        <StepListEditor routine={routine} onChange={onChange} />
      </Grid>
    </Grid>
  );
}

export default RoutineEditor;
