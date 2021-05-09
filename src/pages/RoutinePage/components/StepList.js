import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';
import StepListItem from './StepListItem';

const useStyles = makeStyles((theme) => ({
  list: {
    maxHeight: `calc(100vh - 14em)`,
    overflow: 'auto',
  },
}));

function StepList({ steps, activeItem, onDelete, onEdit, onAdd }) {
  const classes = useStyles();

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={1}
      >
        <Typography>{steps.length} steps</Typography>
        <Button onClick={onAdd} startIcon={<AddIcon />}>
          Aggiungi step
        </Button>
      </Box>

      <Divider />

      <List disablePadding className={classes.list}>
        {steps.map((step, i) => (
          <StepListItem
            key={i}
            index={i}
            step={step}
            active={i === activeItem}
            onDelete={() => onDelete(i)}
            onEdit={() => onEdit(i)}
          />
        ))}
      </List>
    </>
  );
}

export default StepList;
