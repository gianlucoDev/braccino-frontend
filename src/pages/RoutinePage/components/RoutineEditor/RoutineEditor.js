import Hidden from '@material-ui/core/Hidden';

import RoutineEditorWide from './RoutineEditorWide';
import RoutineEditorTabbed from './RoutineEditorTabbed';

function RoutineEditor({
  routine,
  onChange,

  // submit and cancel buttons
  enableSubmit = false,
  enableCancel = false,
  onSubmit,
  onCancel,

  // optional actions
  showOptionalActions = false,
  enableRun = false,
  onDelete,
}) {
  const nameError = enableSubmit && !routine.name;

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
          // data changes
          onNameChange={handleNameChange}
          onStepsChange={handleStepsChange}
          // name text field
          nameError={nameError}
          // submit and cancel buttons
          enableSubmit={enableSubmit}
          enableCancel={enableCancel}
          onSubmit={onSubmit}
          onCancel={onCancel}
          // optional actions
          showOptionalActions={showOptionalActions}
          enableRun={enableRun}
          onDelete={onDelete}
        />
      </Hidden>

      <Hidden mdUp>
        <RoutineEditorTabbed
          routine={routine}
          // data changes
          onNameChange={handleNameChange}
          onStepsChange={handleStepsChange}
          // name text field
          nameError={nameError}
          // submit and cancel buttons
          enableSubmit={enableSubmit}
          enableCancel={enableCancel}
          onSubmit={onSubmit}
          onCancel={onCancel}
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
