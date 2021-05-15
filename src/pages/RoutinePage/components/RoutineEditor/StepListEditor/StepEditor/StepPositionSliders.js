import Grid from '@material-ui/core/Grid';

import LabelSliderNumberCombo from './LabelSliderNumberCombo';
import { JOINTS } from '../../../../joints';

function StepPositionEditor({ step, onChange }) {
  const handlePositionChange = (key) => (value) => {
    onChange({
      ...step,
      position: {
        ...step.position,
        [key]: value,
      },
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
          value={step.position[key]}
          onChange={handlePositionChange(key)}
        />
      ))}
    </Grid>
  );
}

export default StepPositionEditor;
