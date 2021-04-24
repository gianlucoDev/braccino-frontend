import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import Chip from '@material-ui/core/Chip';

import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  valuesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.25),
    },
  },
  active: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  },
}));

function StepListItem({ index, step, active = false, onEdit }) {
  const classes = useStyles();

  const values = (
    <div className={classes.valuesContainer}>
      <Chip size="small" avatar={<Avatar>1</Avatar>} label={step.m1 + '°'} />
      <Chip size="small" avatar={<Avatar>2</Avatar>} label={step.m2 + '°'} />
      <Chip size="small" avatar={<Avatar>3</Avatar>} label={step.m3 + '°'} />
      <Chip size="small" avatar={<Avatar>4</Avatar>} label={step.m4 + '°'} />
      <Chip size="small" avatar={<Avatar>5</Avatar>} label={step.m5 + '°'} />
      <Chip size="small" avatar={<Avatar>6</Avatar>} label={step.m6 + '°'} />
    </div>
  );

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar variant="rounded" className={active ? classes.active : ''}>
          {index + 1}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`Delay: ${step.delay}`}
        primaryTypographyProps={{ variant: 'h6' }}
        secondary={values}
        // HACK: I actually use the second <Typography> as a <div> to hold the values
        secondaryTypographyProps={{ component: 'div' }}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" onClick={onEdit}>
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default StepListItem;
