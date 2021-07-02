import { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { JOINTS } from 'api/joints';

import InputContainer from './InputContainer';
import LabelSliderNumberCombo from './LabelSliderNumberCombo';

function AttackAngleInput({ attack_angle, onChange }) {
  const [lastNotNull, setLastNotNull] = useState(45);
  useEffect(() => {
    if (attack_angle !== null) {
      setLastNotNull(attack_angle);
    }
  }, [attack_angle]);

  const handleAttackAngleToggle = (event) => {
    const checked = event.target.checked;
    if (checked) {
      onChange(null);
    } else {
      onChange(lastNotNull);
    }
  };

  return (
    <>
      <LabelSliderNumberCombo
        label="Attacco"
        min={0}
        max={180}
        disabled={attack_angle === null}
        value={lastNotNull}
        onChange={onChange}
      />

      <FormControlLabel
        control={
          <Switch
            checked={attack_angle === null}
            onChange={handleAttackAngleToggle}
            color="primary"
          />
        }
        label="Angolo di attacco libero"
      />
    </>
  );
}

function GripperInput({ gripper, onChange }) {
  const handleChange = (key) => (newValue) => {
    onChange({
      ...gripper,
      [key]: newValue,
    });
  };

  return (
    <InputContainer heading="Gripper">
      <Grid container>
        <LabelSliderNumberCombo
          label="Apertura"
          min={JOINTS.gripper.min}
          max={JOINTS.gripper.max}
          value={gripper.gripper}
          onChange={handleChange('gripper')}
        />

        <LabelSliderNumberCombo
          label="Rotazione"
          min={JOINTS.wrist_rot.min}
          max={JOINTS.wrist_rot.max}
          value={gripper.gripper_rot}
          onChange={handleChange('gripper_rot')}
        />

        <AttackAngleInput
          attack_angle={gripper.attack_angle}
          onChange={handleChange('attack_angle')}
        />
      </Grid>
    </InputContainer>
  );
}

export default GripperInput;
