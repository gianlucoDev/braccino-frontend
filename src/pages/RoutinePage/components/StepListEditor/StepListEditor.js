import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import StepListEditorWide from './StepListEditorWide';
import StepListEditorMobile from './StepListEditorMobile';

function StepListEditor() {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));

  return sm ? <StepListEditorWide /> : <StepListEditorMobile />;
}

export default StepListEditor;
