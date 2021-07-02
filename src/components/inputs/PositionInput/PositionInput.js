import { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import SlidersIconsIcon from '@material-ui/icons/Tune';
import BorderOuterIcon from '@material-ui/icons/BorderOuter';

import InputContainer from '../InputContainer';
import PositionInputSliders from './PositionInputSliders';
import PositionInputCartesianPlane from './PositionInputCartesianPlane';

const inputModes = {
  sliders: {
    name: 'sliders',
    Icon: SlidersIconsIcon,
    Component: PositionInputSliders,
  },
  plane: {
    name: 'cartesian plane',
    Icon: BorderOuterIcon,
    Component: PositionInputCartesianPlane,
  },
};

function PositionInput({ position, onChange }) {
  const [expanded, setExpanded] = useState(false);
  const [inputMode, setInputMode] = useState(Object.keys(inputModes)[0]);

  const handleChangeInputMode = (event, newInputMode) => {
    // stop the event from toggling the accordion in <InputContainer>
    event.stopPropagation();

    setExpanded(true);
    if (newInputMode !== null) {
      setInputMode(newInputMode);
    }
  };

  const handleExpandedChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  const { Component } = inputModes[inputMode];

  const heading = (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Typography variant="h6">Posizione</Typography>
      <Box marginLeft={2}>
        <ToggleButtonGroup
          size="small"
          exclusive
          aria-label="input-mode"
          value={inputMode}
          onChange={handleChangeInputMode}
        >
          {Object.entries(inputModes).map(([key, { name, Icon }]) => (
            <ToggleButton key={key} value={key} aria-label={name}>
              <Icon />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Box>
  );

  return (
    <InputContainer
      expanded={expanded}
      onExpandedChange={handleExpandedChange}
      heading={heading}
    >
      <Component position={position} onChange={onChange} />
    </InputContainer>
  );
}

export default PositionInput;
