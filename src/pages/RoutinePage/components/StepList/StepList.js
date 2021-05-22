import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';

import { RoutineStateContext } from 'pages/RoutinePage/RoutinePage';
import StepListItem from './StepListItem';

const useStyles = makeStyles((theme) => ({
  list: {
    maxHeight: `calc(100vh - 14em)`,
    overflow: 'auto',
  },
}));

function StepList() {
  const classes = useStyles();
  const { state, dispatch } = useContext(RoutineStateContext);
  const { routine, selectedStepIndex } = state;

  const handleStepCreate = () => {
    dispatch({ type: 'step-create' });
  };

  const handleStepDelete = (index) => () => {
    dispatch({ type: 'step-delete', index });
  };

  const handleStepEdit = (index) => () => {
    dispatch({ type: 'step-select', index });
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={1}
      >
        <Typography>{routine.steps.length} steps</Typography>
        <Button onClick={handleStepCreate} startIcon={<AddIcon />}>
          Aggiungi step
        </Button>
      </Box>

      <Divider />

      <List disablePadding className={classes.list}>
        {routine.steps.map((step, i) => (
          <StepListItem
            key={i}
            index={i}
            step={step}
            active={i === selectedStepIndex}
            onDelete={handleStepDelete(i)}
            onSelect={handleStepEdit(i)}
          />
        ))}
      </List>
    </>
  );
}

export default StepList;
