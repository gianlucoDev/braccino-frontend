import { useContext } from 'react';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useArrayItemSelection from 'hooks/useArrayItemSelection';

import { DEFAULT_JOINT_POSITIONS } from 'api/joints';

import StepListEditorWide from './StepListEditorWide';
import StepListEditorMobile from './StepListEditorMobile';
import { RoutineEditorContext } from '../RoutineEditor';

const defaultStep = {
  delay: 1000,
  speed: 30,
  position: DEFAULT_JOINT_POSITIONS,
};

function StepListEditor() {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));

  const { routine, setRoutine } = useContext(RoutineEditorContext);
  const steps = routine.steps || [];

  const [selectedStep, selectedIndex, setSelectedStep] = useArrayItemSelection(
    steps,
    0
  );

  const setSteps = (steps) => {
    setRoutine({
      ...routine,
      steps,
    });
  };

  const handleStepSelect = (index) => {
    setSelectedStep(index);
  };

  const handleNewStep = () => {
    const lastStep = steps.length >= 1 ? steps[steps.length - 1] : null;
    const newStep = lastStep || { ...defaultStep };
    const newSteps = [...steps, newStep];

    setSteps(newSteps);
    // select the last step
    setSelectedStep(newSteps.length - 1);
  };

  const handleStepChange = (newStep) => {
    const newSteps = [...steps];
    newSteps[selectedIndex] = newStep;

    setSteps(newSteps);
  };

  const handleStepDelete = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);

    setSteps(newSteps);
  };

  const EditorLayout = sm ? StepListEditorWide : StepListEditorMobile;

  return (
    <EditorLayout
      steps={steps}
      selectedIndex={selectedIndex}
      selectedStep={selectedStep}
      onStepSelect={handleStepSelect}
      onNewStep={handleNewStep}
      onStepChange={handleStepChange}
      onStepDelete={handleStepDelete}
    />
  );
}

export default StepListEditor;
