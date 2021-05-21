import { createContext, useState } from 'react';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useArrayItemSelection from 'hooks/useArrayItemSelection';

import RoutineEditorWide from './RoutineEditorWide';
import RoutineEditorTabbed from './RoutineEditorTabbed';

const RoutineEditorContext = createContext();

function RoutineEditor({
  routine,
  onChange: setRoutine,
  dirty = false,
  isNew = false,

  // optional actions
  onDelete,
}) {
  // style
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  const EditorLayout = md ? RoutineEditorWide : RoutineEditorTabbed;

  // state
  const [selectedStep, selectedStepIndex, setSelectedStep] =
    useArrayItemSelection(routine.steps, 0);

  // toggles the step editor in mobile layout
  const [stepEditorModalOpen, setStepEditorModalOpen] = useState(false);

  const editStep = (stepIndex) => {
    setStepEditorModalOpen(true);
    setSelectedStep(stepIndex);
  };

  const closeStepEditor = () => {
    setStepEditorModalOpen(false);
  };

  // utility function to avoid copying this snippet in all components
  const setSteps = (steps) => {
    setRoutine({
      ...routine,
      steps,
    });
  };

  const contextValue = {
    // routine state
    routine,
    selectedStep,
    selectedStepIndex,

    // editor state
    dirty,
    isNew,
    stepEditorModalOpen,

    // callbacks
    setRoutine,
    setSteps,
    editStep,
    closeStepEditor,
  };

  return (
    <RoutineEditorContext.Provider value={contextValue}>
      <EditorLayout
        // optional actions
        onDelete={onDelete}
      />
    </RoutineEditorContext.Provider>
  );
}

export default RoutineEditor;
export { RoutineEditorContext };
