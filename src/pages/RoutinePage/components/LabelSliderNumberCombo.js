import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: 'bold',
  },
  extremes: {
    width: 42,
    color: theme.palette.grey[500],
  },
  textField: {
    width: 63,
  },
}));

function LabelSliderNumberCombo({ label, min, max, value, onChange }) {
  const classes = useStyles();

  const handleSliderChange = (event, newValue) => {
    onChange(newValue);
  };

  const handleInputChange = (event) => {
    onChange(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < min) {
      onChange(min);
    } else if (value > max) {
      onChange(max);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Typography className={classes.label}>{label}</Typography>
      </Grid>
      <Grid item className={classes.extremes}>
        <Typography>{min}</Typography>
      </Grid>
      <Grid item xs>
        <Slider
          aria-labelledby={label}
          min={min}
          max={max}
          value={value}
          onChange={handleSliderChange}
        />
      </Grid>
      <Grid item className={classes.extremes}>
        <Typography>{max}</Typography>
      </Grid>
      <Grid item>
        <TextField
          type="number"
          className={classes.textField}
          value={value}
          inputProps={{
            min,
            max,
            type: 'number',
            'aria-labelledby': label,
          }}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </Grid>
    </Grid>
  );
}

export default LabelSliderNumberCombo;
