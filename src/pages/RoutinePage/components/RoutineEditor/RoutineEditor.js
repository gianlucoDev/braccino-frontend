import { createContext } from 'react';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useArrayItemSelection from 'hooks/useArrayItemSelection';

import RoutineEditorWide from './RoutineEditorWide';
import RoutineEditorTabbed from './RoutineEditorTabbed';

const RoutineEditorContext = createContext();

function RoutineEditor({
  routine,
  onChange,
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
  // const steps = routine.steps || [];
  const [selectedStep, selectedIndex, setSelectedStep] = useArrayItemSelection(
    routine.steps,
    0
  );

  const contextValue = {
    routine,
    dirty,
    isNew,
    selectedStep,
    selectedIndex,

    setRoutine: onChange,
    setSelectedStep,
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
