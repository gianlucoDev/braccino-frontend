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
  dirty = false,

  // data changes
  onNameChange,
  onStepsChange,

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
              dirty={dirty}
              // name text field
              onNameChange={onNameChange}
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
