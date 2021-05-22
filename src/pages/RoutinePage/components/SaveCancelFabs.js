import { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';

import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import { RoutineStateContext } from '../RoutinePage';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),

    // show on top of modals,
    // such as the <Dialog> in <StepListEditorMobile>
    zIndex: theme.zIndex.modal + 1,
  },
  extendedFabIcon: {
    marginRight: theme.spacing(1),
  },
}));

function SaveCancelFabs() {
  const classes = useStyles();
  const { state, dispatch } = useContext(RoutineStateContext);
  const { dirty, routine } = state;

  // The only validation is that the name is not empty.
  // All the other data should always be valid since all imputs are constrained.
  // Also, if the data was not in the correct shape, the other components would
  // throw error and crash the whole application.
  const valid = !!routine.name;

  const disableSubmit = !dirty || !valid;
  const disableReset = !dirty;

  const handleSubmit = () => {
    dispatch({ type: 'routine-save' });
  };

  const handleReset = () => {
    dispatch({ type: 'reset' });
  };

  return (
    <div className={classes.root}>
      <Slide direction="up" in={!disableSubmit}>
        <Fab
          variant="extended"
          size="large"
          color="primary"
          disabled={disableSubmit}
          onClick={handleSubmit}
        >
          <SaveIcon className={classes.extendedFabIcon} />
          Salva
        </Fab>
      </Slide>
      <Slide direction="up" in={!disableReset}>
        <Fab
          variant="extended"
          size="large"
          color="secondary"
          disabled={disableReset}
          onClick={handleReset}
        >
          <CancelIcon className={classes.extendedFabIcon} />
          Annulla
        </Fab>
      </Slide>
    </div>
  );
}

export default SaveCancelFabs;
