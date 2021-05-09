import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
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

  // name text field
  nameError,
  onNameChange,

  // submit-cancel actions
  enableSubmit = false,
  enableCancel = false,
  onSubmit,
  onCancel,

  // optional actions
  showOptionalActions = false,
  enableRun = false,
  onDelete,
}) {
  const classes = useStyles();

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

      {/* save-cancel buttons */}
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.button}
          startIcon={<SaveIcon />}
          disabled={!enableSubmit || nameError}
          onClick={onSubmit}
        >
          Salva
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          className={classes.button}
          startIcon={<CancelIcon />}
          disabled={!enableCancel}
          onClick={onCancel}
        >
          Annulla
        </Button>
      </Box>

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
