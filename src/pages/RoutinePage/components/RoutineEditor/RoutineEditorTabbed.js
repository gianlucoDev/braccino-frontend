import { useState } from 'react';

import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import BraccioAppBar from 'components/BraccioAppBar';

import RoutineEditorControls from './RoutineEditorControls';
import StepListEditor from './StepListEditor/StepListEditor';

function RoutineEditorTabbed({
  routine,

  // data changes
  onNameChange,
  onStepsChange,

  // name text field
  nameError,

  // submit and cancel buttons
  enableSubmit = false,
  enableCancel = false,
  onSubmit,
  onCancel,

  // optional actions
  showOptionalActions = false,
  enableRun = false,
  onDelete,
}) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box flexShrink={1}>
        <BraccioAppBar>
          <Tabs
            variant="fullWidth"
            value={selectedTab}
            onChange={handleTabChange}
          >
            <Tab label="Routine" />
            <Tab label="Steps" />
          </Tabs>
        </BraccioAppBar>
      </Box>
      <Box flexGrow={1}>
        <div hidden={selectedTab !== 0}>
          <Box padding={2}>
            <Typography variant="h4" gutterBottom>
              Routine
            </Typography>

            <RoutineEditorControls
              routine={routine}
              // name text field
              nameError={nameError}
              onNameChange={onNameChange}
              // submit-cancel actions
              enableSubmit={enableSubmit}
              enableCancel={enableCancel}
              onSubmit={onSubmit}
              onCancel={onCancel}
              // optional actions
              showOptionalActions={showOptionalActions}
              enableRun={enableRun}
              onDelete={onDelete}
            />
          </Box>
        </div>

        <div hidden={selectedTab !== 1}>
          <StepListEditor steps={routine.steps} onChange={onStepsChange} />
        </div>
      </Box>
    </Box>
  );
}

export default RoutineEditorTabbed;
