import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/Delete';

import RoutineEditorRunControls from './RoutineEditorRunControls';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  wideButton: {
    margin: theme.spacing(1, 0),
  },
}));

function RoutineEditorControls({
  routine,
  dirty = false,

  // name text field
  onNameChange,

  // optional actions
  showOptionalActions = false,
  enableRun = false,
  onDelete,
}) {
  const classes = useStyles();
  const nameError = dirty && !routine.name;

  return (
    <>
      {/* name text field */}
      <TextField
        id="name"
        label="Nome"
        variant="outlined"
        fullWidth
        value={routine.name}
        error={nameError}
        helperText={nameError ? 'Nome richisto' : undefined}
        onChange={(e) => onNameChange(e.target.value)}
      />

      {/* actions */}
      {showOptionalActions && (
        <>
          <Typography variant="h6">Cancella routine</Typography>
          <Box display="flex">
            <Button
              variant="outlined"
              fullWidth
              className={classes.wideButton}
              startIcon={<DeleteIcon />}
              onClick={onDelete}
            >
              Elimina routine
            </Button>
          </Box>

          <RoutineEditorRunControls routine={routine} enabled={enableRun} />
        </>
      )}
    </>
  );
}

export default RoutineEditorControls;
