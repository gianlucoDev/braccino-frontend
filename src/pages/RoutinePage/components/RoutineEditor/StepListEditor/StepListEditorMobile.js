import { useState, forwardRef } from 'react';

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

function StepListEditorMobile({
  steps,
  selectedStep,
  onStepSelect,
  onNewStep,
  onStepChange,
  onStepDelete,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleStepSelect = (i) => {
    setOpen(true);
    onStepSelect(i);
  };

  return (
    <>
      <StepList
        steps={steps}
        activeItem={null}
        onDelete={onStepDelete}
        onEdit={handleStepSelect}
        onAdd={onNewStep}
      />

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
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
          <StepEditor step={selectedStep} onChange={onStepChange} />
        </Box>
      </Dialog>
    </>
  );
}

export default StepListEditorMobile;
