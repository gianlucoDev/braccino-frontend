import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  valuesContainer: {
    '& > *': {
      margin: theme.spacing(0.25),
    },
  },
  chipRoot: {
    width: '5em',
    justifyContent: 'left',
  },
  active: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  },
}));

function StepListItem({ index, step, active = false, onDelete, onEdit }) {
  const classes = useStyles();

  const StepValue = ({ i, name }) => {
    return (
      <Chip
        classes={{ root: classes.chipRoot }}
        size="small"
        avatar={<Avatar>{i}</Avatar>}
        label={step.position[name] + '°'}
      />
    );
  };

  const values = (
    <>
      <div className={classes.valuesContainer}>
        <StepValue i={1} name="base" />
        <StepValue i={2} name="shoulder" />
        <StepValue i={3} name="elbow" />
      </div>
      <div className={classes.valuesContainer}>
        <StepValue i={4} name="wrist_ver" />
        <StepValue i={5} name="wrist_rot" />
        <StepValue i={6} name="gripper" />
      </div>
    </>
  );

  return (
    <ListItem button alignItems="flex-start" onClick={onEdit} selected={active}>
      <ListItemAvatar>
        <Avatar variant="rounded" className={active ? classes.active : ''}>
          {index + 1}
        </Avatar>
      </ListItemAvatar>
      <Box marginY={1} display="flex" flexDirection="column">
        <Typography variant="h6" component="p" gutterBottom>
          Delay: {step.delay}
        </Typography>
        {values}
      </Box>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default StepListItem;
