import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import RoutineEditorWide from './RoutineEditorWide';
import RoutineEditorTabbed from './RoutineEditorTabbed';

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

  const handleStepsChange = (steps) => {
    onChange({
      ...routine,
      steps,
    });
  };

  const EditorLayout = md ? RoutineEditorWide : RoutineEditorTabbed;

  return (
    <EditorLayout
      routine={routine}
      dirty={dirty}
      // data changes
      onNameChange={handleNameChange}
      onStepsChange={handleStepsChange}
      // optional actions
      showOptionalActions={showOptionalActions}
      enableRun={enableRun}
      onDelete={onDelete}
    />
  );
}

export default RoutineEditor;
