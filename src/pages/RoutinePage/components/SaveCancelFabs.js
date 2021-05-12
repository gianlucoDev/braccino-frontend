import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';

import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedFabIcon: {
    marginRight: theme.spacing(1),
  },
}));

function SaveCancelFabs({ disableSubmit, disableCancel, onSubmit, onCancel }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slide direction="up" in={!disableSubmit}>
        <Fab
          variant="extended"
          size="large"
          color="primary"
          disabled={disableSubmit}
          onClick={onSubmit}
        >
          <SaveIcon className={classes.extendedFabIcon} />
          Salva
        </Fab>
      </Slide>
      <Slide direction="up" in={!disableCancel}>
        <Fab
          variant="extended"
          size="large"
          color="secondary"
          disabled={disableCancel}
          onClick={onCancel}
        >
          <CancelIcon className={classes.extendedFabIcon} />
          Annulla
        </Fab>
      </Slide>
    </div>
  );
}

export default SaveCancelFabs;
