import { createContext } from 'react';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import RoutineEditorWide from './RoutineEditorWide';
import RoutineEditorTabbed from './RoutineEditorTabbed';

const RoutineEditorContext = createContext();

function RoutineEditor({
  routine,
  onChange,
  dirty = false,

  // optional actions
  showOptionalActions = false,
  enableRun = false,
  onDelete,
}) {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  const handleNameChange = (name) => {
    onChange({
      ...routine,
      name,
    });
  };

  const EditorLayout = md ? RoutineEditorWide : RoutineEditorTabbed;

  const value = { routine, setRoutine: onChange };
  return (
    <RoutineEditorContext.Provider value={value}>
      <EditorLayout
        routine={routine}
        dirty={dirty}
        // data changes
        onNameChange={handleNameChange}
        // optional actions
        showOptionalActions={showOptionalActions}
        enableRun={enableRun}
        onDelete={onDelete}
      />
    </RoutineEditorContext.Provider>
  );
}

export default RoutineEditor;
export { RoutineEditorContext };
