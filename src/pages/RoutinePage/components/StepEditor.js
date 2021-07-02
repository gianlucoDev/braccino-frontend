import { useContext } from 'react';

import Box from '@material-ui/core/Box';
import ListIcon from '@material-ui/icons/ListAlt';

import BigMessage from 'components/BigMessage';
import PositionInput from 'components/inputs/PositionInput';
import SpeedInput from 'components/inputs/SpeedInput';
import GripperInput from 'components/inputs/GripperInput';
import DelayInput from 'components/inputs/DelayInput';

import { RoutineStateContext } from 'pages/RoutinePage/RoutinePage';

function StepEditor() {
  const { state, dispatch } = useContext(RoutineStateContext);
  const { routine, selectedStepIndex } = state;

  const selectedStep =
    selectedStepIndex !== null ? routine.steps[selectedStepIndex] : null;

  const updateKey = (key) => (value) => {
    const step = {
      ...selectedStep,
      [key]: value,
    };

    dispatch({ type: 'step-edit', step });
  };

  const updateGripper = (newGripper) => {
    const step = {
      ...selectedStep,
      ...newGripper,
    };

    dispatch({ type: 'step-edit', step });
  };

  // there are no steps
  if (!selectedStep && routine.steps.length === 0) {
    return (
      <BigMessage
        IconComponent={ListIcon}
        message="Non ci sono step"
        suggestion="Puoi crearne uno dal pannello a sinistra"
      />
    );
  }

  // there are some steps, but none is selected
  if (!selectedStep) {
    return (
      <BigMessage
        IconComponent={ListIcon}
        message="Nessuno step selezionato"
        suggestion="Puoi selezionarne uno dal pannello a sinistra"
      />
    );
  }

  const gripper = {
    attack_angle: selectedStep.attack_angle,
    gripper: selectedStep.gripper,
    gripper_rot: selectedStep.gripper_rot,
  };

  // edit selected step
  return (
    <>
      <Box paddingY={1}>
        <PositionInput
          position={selectedStep.position}
          onChange={updateKey('position')}
        />
      </Box>
      <Box paddingY={1}>
        <GripperInput gripper={gripper} onChange={updateGripper} />
      </Box>
      <Box paddingY={1}>
        <SpeedInput speed={selectedStep.speed} onChange={updateKey('speed')} />
      </Box>
      <Box paddingY={1}>
        <DelayInput delay={selectedStep.delay} onChange={updateKey('delay')} />
      </Box>
    </>
  );
}

export default StepEditor;
