import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function RoutineEditorControls({
  name,
  onNameChange,
  nameError = false,
  nameHelperText,
  enableSubmitCancel,
  onSubmit,
  onCancel,
}) {
  const classes = useStyles();

  return (
    <Paper>
      <TextField
        id="name"
        label="Nome"
        variant="filled"
        fullWidth
        value={name}
        error={nameError}
        helperText={nameHelperText}
        onChange={onNameChange}
      />
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<SaveIcon />}
          disabled={!enableSubmitCancel}
          onClick={onSubmit}
        >
          Salva
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<CancelIcon />}
          disabled={!enableSubmitCancel}
          onClick={onCancel}
        >
          Annulla
        </Button>
      </Box>
    </Paper>
  );
}

export default RoutineEditorControls;
