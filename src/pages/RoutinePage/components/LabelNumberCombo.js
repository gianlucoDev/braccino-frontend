import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: 'bold',
  },
}));

function LabelNumberCombo({ label, min = undefined, max = undefined, value, onChange }) {
  const classes = useStyles();

  const handleInputChange = (event) => {
    onChange(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (min !== undefined && value < min) {
      onChange(min);
    } else if (max !== undefined && value > max) {
      onChange(max);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Typography className={classes.label}>{label}</Typography>
      </Grid>
      <Grid item xs>
        <TextField
          type="number"
          fullWidth
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

export default LabelNumberCombo;
