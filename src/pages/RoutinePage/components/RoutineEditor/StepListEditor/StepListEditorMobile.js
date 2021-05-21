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

import StepList from './StepList/StepList';
import StepEditor from './StepEditor/StepEditor';
import { RoutineEditorContext } from '../RoutineEditor';

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

  // FIXME: move state up so it can be accessed through context
  const { stepEditorModalOpen, closeStepEditor } =
    useContext(RoutineEditorContext);

  return (
    <>
      <StepList />

      <Dialog
        fullScreen
        open={stepEditorModalOpen}
        onClose={closeStepEditor}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={closeStepEditor}
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
