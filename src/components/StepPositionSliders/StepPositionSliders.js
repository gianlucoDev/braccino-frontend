import Grid from '@material-ui/core/Grid';

import LabelSliderNumberCombo from './LabelSliderNumberCombo';
import { JOINTS } from '../../api/joints';

function StepPositionSliders({ position, onChange }) {
  const handleChange = (key) => (value) => {
    onChange({
      ...position,
      [key]: value,
    });
  };

  return (
    <Grid container>
      {Object.entries(JOINTS).map(([key, joint]) => (
        <LabelSliderNumberCombo
          key={key}
          label={JOINTS[key].name}
          min={joint.min}
          max={joint.max}
          value={position[key]}
          onChange={handleChange(key)}
        />
      ))}
    </Grid>
  );
}

export default StepPositionSliders;
