import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';

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
  onDelete = null,
}) {
  const classes = useStyles();

  return (
    <>
      <TextField
        id="name"
        label="Nome"
        variant="outlined"
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
          fullWidth
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
          fullWidth
          className={classes.button}
          startIcon={<CancelIcon />}
          disabled={!enableSubmitCancel}
          onClick={onCancel}
        >
          Annulla
        </Button>
      </Box>
      {!!onDelete && (
        <>
          <Typography variant="h6">Azioni</Typography>
          <Box display="flex">
            <Button
              variant="outlined"
              fullWidth
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={onDelete}
            >
              Elimina routine
            </Button>
          </Box>
        </>
      )}
    </>
  );
}

export default RoutineEditorControls;
