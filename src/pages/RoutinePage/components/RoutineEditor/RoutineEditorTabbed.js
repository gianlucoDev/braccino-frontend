import { useState } from 'react';

import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import BraccioAppBar from 'components/BraccioAppBar';

import RoutineImportExportButton from './RoutineImportExportButton';
import RoutineEditorControls from './RoutineEditorControls';
import StepListEditor from '../StepListEditor';

function RoutineEditorTabbed() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box flexShrink={1}>
        <BraccioAppBar extraButtons={<RoutineImportExportButton />}>
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
        {selectedTab === 0 && (
          <Box padding={2}>
            <Typography variant="h4" gutterBottom>
              Routine
            </Typography>

            <RoutineEditorControls />
          </Box>
        )}

        {selectedTab === 1 && <StepListEditor />}
      </Box>
    </Box>
  );
}

export default RoutineEditorTabbed;
