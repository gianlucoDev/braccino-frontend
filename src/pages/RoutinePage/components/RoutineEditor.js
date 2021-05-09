import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import RoutineEditorControls from './RoutineEditorControls';

import StepListEditor from './StepListEditor';

const useStyles = makeStyles((theme) => ({
  tabsPaper: {
    backgroundColor: theme.palette.primary.main,
  },
}));

function RoutineEditor({
  routine,
  onChange,

  // name text field
  enableSubmit = false,
  enableCancel = false,
  onSubmit,
  onCancel,

  // optional actions
  showOptionalActions = false,
  enableRun = false,
  onDelete,
}) {
  const classes = useStyles();
  const nameError = enableSubmit && !routine.name;

  const handleNameChange = (name) => {
    onChange({
      ...routine,
      name,
    });
  };

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabbedLayout = () => (
    <>
      <Paper square elevation={0} className={classes.tabsPaper}>
        <Tabs
          variant="fullWidth"
          value={selectedTab}
          onChange={handleTabChange}
        >
          <Tab label="Routine" />
          <Tab label="Steps" />
        </Tabs>
      </Paper>

      <div hidden={selectedTab !== 0}>
        <Box padding={2}>
          <Typography variant="h4" gutterBottom>
            Routine
          </Typography>

          <RoutineEditorControls
            routine={routine}
            // name text field
            nameError={nameError}
            onNameChange={handleNameChange}
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
        <StepListEditor routine={routine} onChange={onChange} />
      </div>
    </>
  );

  const desktopLayout = () => (
    <Grid container style={{ height: '100%' }}>
      {/* left left column */}
      <Grid item xs={3}>
        <Box padding={2}>
          <Typography variant="h4" gutterBottom>
            Routine
          </Typography>

          <RoutineEditorControls
            routine={routine}
            // name text field
            nameError={nameError}
            onNameChange={handleNameChange}
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
      </Grid>

      <Grid item xs={9}>
        <StepListEditor routine={routine} onChange={onChange} />
      </Grid>
    </Grid>
  );

  return (
    <>
      <Hidden smDown>{desktopLayout()}</Hidden>
      <Hidden mdUp>{tabbedLayout()}</Hidden>
    </>
  );
}

export default RoutineEditor;
