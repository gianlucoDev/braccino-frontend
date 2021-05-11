import Hidden from '@material-ui/core/Hidden';

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

  return (
    <>
      <Hidden smDown>
        <RoutineEditorWide
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
      </Hidden>

      <Hidden mdUp>
        <RoutineEditorTabbed
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
      </Hidden>
    </>
  );
}

export default RoutineEditor;
