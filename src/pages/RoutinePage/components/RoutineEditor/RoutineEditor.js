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
  isNew = false,

  // optional actions
  onDelete,
}) {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  const EditorLayout = md ? RoutineEditorWide : RoutineEditorTabbed;

  const value = { routine, setRoutine: onChange, dirty, isNew };
  return (
    <RoutineEditorContext.Provider value={value}>
      <EditorLayout
        // optional actions
        onDelete={onDelete}
      />
    </RoutineEditorContext.Provider>
  );
}

export default RoutineEditor;
export { RoutineEditorContext };
