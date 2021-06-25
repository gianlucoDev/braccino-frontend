import { forwardRef, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';

import { RoutineStateContext } from 'pages/RoutinePage/RoutinePage';
import StepList from '../StepList';
import StepEditor from '../StepEditor';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function StepListEditorMobile() {
  const classes = useStyles();

  const { state, dispatch } = useContext(RoutineStateContext);
  const stepEditorOpen = state.selectedStepIndex !== null;

  const handleStepDeselect = () => {
    dispatch({ type: 'step-deselect' });
  };

  return (
    <>
      <StepList />

      <Dialog
        fullScreen
        open={stepEditorOpen}
        onClose={handleStepDeselect}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleStepDeselect}
              aria-label="chiudi"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Impostazioni step
            </Typography>
          </Toolbar>
        </AppBar>

        <Box padding={2}>
          <StepEditor />
        </Box>
      </Dialog>
    </>
  );
}

export default StepListEditorMobile;
