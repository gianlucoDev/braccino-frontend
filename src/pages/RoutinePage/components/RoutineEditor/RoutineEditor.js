import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import RoutineEditorWide from './RoutineEditorWide';
import RoutineEditorTabbed from './RoutineEditorTabbed';

function RoutineEditor() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  return md ? <RoutineEditorWide /> : <RoutineEditorTabbed />;
}

export default RoutineEditor;
