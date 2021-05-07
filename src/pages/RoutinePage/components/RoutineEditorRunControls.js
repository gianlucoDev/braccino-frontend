import { useState } from 'react';
import useSWR from 'swr';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import { runRoutine } from '../../../api/braccio';

const useStyles = makeStyles((theme) => ({
  wideButton: {
    margin: theme.spacing(1, 0),
  },
  formControl: {
    margin: theme.spacing(1, 0),
  },
}));

export function RoutineEditorRunControls({ routine, enabled = false }) {
  const classes = useStyles();
  const { data, error } = useSWR('/braccio');

  const [braccio, setBraccio] = useState(null);

  const handleChange = (event) => {
    const braccioSerialNumber = event.target.value;
    const newBraccio = data.find(
      (b) => b.serial_number === braccioSerialNumber
    );
    setBraccio(newBraccio);
  };

  const handleRun = async () => {
    await runRoutine(braccio, routine);
  };

  return (
    <>
      <Typography variant="h6">Esegui routine su un braccio</Typography>

      <FormControl
        variant="outlined"
        fullWidth
        className={classes.formControl}
        disabled={error || !data}
      >
        <InputLabel id="braccio-run-routine-select-label">Braccio</InputLabel>
        <Select
          labelId="braccio-run-routine-select-label"
          id="braccio-run-routine-select"
          value={braccio ? braccio.serial_number : ''}
          onChange={handleChange}
          label="Age"
        >
          {data &&
            data.map((braccio) => (
              <MenuItem
                key={braccio.serial_number}
                value={braccio.serial_number}
              >
                {braccio.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        fullWidth
        className={classes.wideButton}
        startIcon={<PlayArrowIcon />}
        disabled={!enabled || !braccio || error}
        onClick={() => handleRun(braccio)}
      >
        Avvia routine
      </Button>
    </>
  );
}

export default RoutineEditorRunControls;
