import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';

import { defaultStep } from 'api/steps';

import { RoutineEditorContext } from '../../RoutineEditor';
import StepListItem from './StepListItem';

const useStyles = makeStyles((theme) => ({
  list: {
    maxHeight: `calc(100vh - 14em)`,
    overflow: 'auto',
  },
}));

function StepList() {
  const classes = useStyles();
  const { routine, selectedStepIndex, setSteps, editStep } =
    useContext(RoutineEditorContext);
  const { steps } = routine;

  const handleStepCreate = () => {
    const lastStep = steps.length >= 1 ? steps[steps.length - 1] : null;
    const newStep = lastStep || { ...defaultStep };
    const newSteps = [...steps, newStep];

    setSteps(newSteps);
    // select the last step
    editStep(newSteps.length - 1);
  };

  const handleStepDelete = (i) => () => {
    const newSteps = [...steps];
    newSteps.splice(i, 1);

    setSteps(newSteps);
  };

  const handleStepEdit = (i) => () => {
    editStep(i);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={1}
      >
        <Typography>{steps.length} steps</Typography>
        <Button onClick={handleStepCreate} startIcon={<AddIcon />}>
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
