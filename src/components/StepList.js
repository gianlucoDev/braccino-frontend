import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

function StepList({ steps, onEdit, onAdd }) {
  return (
    <List>
      {steps.map((step, i) => (
        <ListItem key={i}>
          <ListItemAvatar>
            <Avatar>{i + 1}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`Delay: ${step.delay}`}
            secondary={`m1 ${step.m1}°, m2 ${step.m2}°, m3 ${step.m3}°, m4 ${step.m4}°, m5 ${step.m5}°, m6 ${step.m6}°`}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" onClick={onEdit}>
              <EditIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}

      <ListItem inset>
        <ListItemText primary="Nuovo step" />
        <ListItemSecondaryAction>
          <Button onClick={onAdd} startIcon={<AddIcon />}>
            Crea
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

export default StepList;
