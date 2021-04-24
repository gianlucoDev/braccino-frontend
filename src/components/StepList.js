import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';
import StepListItem from './StepListItem';

function StepList({ steps, activeItem, onEdit, onAdd }) {
  return (
    <List>
      {steps.map((step, i) => (
        <StepListItem
          key={i}
          index={i}
          step={step}
          active={i === activeItem}
          onEdit={() => onEdit(i)}
        />
      ))}

      <Divider />

      <ListItem alignItems="flex-start">
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
