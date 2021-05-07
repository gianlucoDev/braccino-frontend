import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';

import useArrayItemSelection from '../../../hooks/useArrayItemSelection';
import StepList from './StepList';
import StepEditor from './StepEditor';

import { DEFAULT_JOINT_VALUES } from '../joints';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function RoutineEditor({
  routine,
  enableSubmit,
  enableCancel,
  onChange,
  onSubmit,
  onCancel,
  onDelete = null,
}) {
  const classes = useStyles();

  const [selectedStep, setSelectedStep, selectedIndex] = useArrayItemSelection(
    routine ? routine.steps : []
  );
  const nameError = enableSubmit && !routine.name;

  const handleNameChange = (name) => {
    onChange({
      ...routine,
      name,
    });
  };

  const handleStepSelect = (index) => {
    setSelectedStep(index);
  };

  const handleNewStep = () => {
    const newStep = {
      ...DEFAULT_JOINT_VALUES,
      delay: 1000,
    };

    onChange({
      ...routine,
      steps: [...routine.steps, newStep],
    });
  };

  const handleStepChange = (newStep) => {
    const newSteps = [...routine.steps];
    newSteps[selectedIndex] = newStep;

    const newState = {
      ...routine,
      steps: newSteps,
    };

    onChange(newState);
  };

  const handleStepDelete = (index) => {
    const newSteps = [...routine.steps];
    newSteps.splice(index, 1);

    onChange({
      ...routine,
      steps: newSteps,
    });
  };

  return (
    <Grid container style={{ height: '100%' }}>
      {/* left column */}
      <Grid item xs={6}>
        <Paper square style={{ height: '100%' }}>
          <Grid container>
            {/* left left column */}
            <Grid item xs={6}>
              <Box padding={2}>
                <Typography variant="h4" gutterBottom>
                  Routine
                </Typography>

                {/* name text field */}
                <TextField
                  id="name"
                  label="Nome"
                  variant="outlined"
                  fullWidth
                  value={routine.name}
                  error={nameError}
                  helperText={nameError ? 'Nome richisto' : undefined}
                  onChange={(e) => handleNameChange(e.target.value)}
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
              </Box>
            </Grid>

            {/* left right column */}
            <Grid item xs={6}>
              <Box paddingTop={2}>
                <Typography variant="h4" gutterBottom>
                  Steps
                </Typography>
                <StepList
                  steps={routine.steps}
                  activeItem={selectedIndex}
                  onDelete={handleStepDelete}
                  onEdit={handleStepSelect}
                  onAdd={handleNewStep}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Right column */}
      <Grid item xs={6}>
        <Box padding={2}>
          {selectedStep === null ? (
            <Typography variant="h3">
              Seleziona uno step dal pannello a sinistra
            </Typography>
          ) : (
            <StepEditor step={selectedStep} onChange={handleStepChange} />
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default RoutineEditor;
