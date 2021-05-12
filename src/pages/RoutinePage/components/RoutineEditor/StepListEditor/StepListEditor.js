import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useArrayItemSelection from 'hooks/useArrayItemSelection';

import StepListEditorWide from './StepListEditorWide';
import StepListEditorMobile from './StepListEditorMobile';

import { DEFAULT_JOINT_VALUES } from '../../../joints';

const defaultStep = {
  ...DEFAULT_JOINT_VALUES,
  delay: 1000,
};

function StepListEditor({ steps, onChange }) {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));

  const [selectedStep, selectedIndex, setSelectedStep] = useArrayItemSelection(
    steps || [],
    0
  );

  const handleStepSelect = (index) => {
    setSelectedStep(index);
  };

  const handleNewStep = () => {
    const lastStep = steps.length >= 1 ? steps[steps.length - 1] : null;
    const newStep = lastStep || defaultStep;
    const newSteps = [...steps, newStep];

    onChange(newSteps);
    // select the last step
    setSelectedStep(newSteps.length - 1);
  };

  const handleStepChange = (newStep) => {
    const newSteps = [...steps];
    newSteps[selectedIndex] = newStep;

    onChange(newSteps);
  };

  const handleStepDelete = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);

    onChange(newSteps);
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
