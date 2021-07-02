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
    width: '6em',
    justifyContent: 'left',
  },
  active: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  },
}));

function StepListItem({ index, step, active = false, onDelete, onSelect }) {
  const classes = useStyles();

  const StepValue = ({ name }) => {
    return (
      <Chip
        classes={{ root: classes.chipRoot }}
        size="small"
        avatar={<Avatar>{name}</Avatar>}
        label={step.position[name] + '°'}
      />
    );
  };

  const values = (
    <div className={classes.valuesContainer}>
      <StepValue name="x" />
      <StepValue name="y" />
      <StepValue name="z" />
    </div>
  );

  return (
    <ListItem
      button
      alignItems="flex-start"
      onClick={onSelect}
      selected={active}
    >
      <ListItemAvatar>
        <Avatar variant="rounded" className={active ? classes.active : ''}>
          {index + 1}
        </Avatar>
      </ListItemAvatar>
      <Box marginY={1} display="flex" flexDirection="column">
        <Typography variant="h6" component="p">
          Delay: {step.delay}
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Speed: {step.speed}
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
