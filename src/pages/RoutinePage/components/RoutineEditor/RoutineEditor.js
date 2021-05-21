import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import RoutineEditorWide from './RoutineEditorWide';
import RoutineEditorTabbed from './RoutineEditorTabbed';

function RoutineEditor({
  // optional actions
  onDelete,
}) {
  // style
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  const EditorLayout = md ? RoutineEditorWide : RoutineEditorTabbed;

  return (
    <EditorLayout
      // optional actions
      onDelete={onDelete}
    />
  );
}

export default RoutineEditor;
