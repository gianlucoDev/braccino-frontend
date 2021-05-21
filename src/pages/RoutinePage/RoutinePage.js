import { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSWR, { mutate } from 'swr';

import Typography from '@material-ui/core/Typography';

import {
  DEFAULT_ROUTINE,
  createRoutine,
  updateRoutine,
  deleteRoutine,
} from 'api/routines';
import useDirtyData from 'hooks/useDirtyData';
import useArrayItemSelection from 'hooks/useArrayItemSelection';

import RoutineEditor from './components/RoutineEditor/RoutineEditor';
import SaveCancelFabs from './components/SaveCancelFabs';

const RoutineContext = createContext();

function RoutinePage({ createNew = false, id }) {
  const history = useHistory();

  // action handling
  const handleSubmitNew = async () => {
    const created = await createRoutine(routine);

    // preload the data so the next page loads instantly
    mutate(`/routines/${created.id}`, routine, false);

    // navigate to newly created routine
    history.push(`/routines/${created.id}`);
  };

  const handleSubmitEdit = async () => {
    await updateRoutine(id, routine);

    // trigger re-validation
    mutate(`/routines/${id}`);
  };

  const handleReset = () => {
    reset();
  };

  const handleDelete = async () => {
    await deleteRoutine(id);
    history.push('/');
  };

  // state

  const { data, error } = useSWR(createNew ? null : `/routines/${id}`);
  const [routine, setRoutine, dirty, reset] = useDirtyData(
    createNew ? DEFAULT_ROUTINE : data
  );
  const [selectedStep, selectedStepIndex, setSelectedStep] =
    useArrayItemSelection(!!routine ? routine.steps : [], 0);

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
    isNew: createNew,
    stepEditorModalOpen,

    // callbacks
    setRoutine,
    setSteps,
    editStep,
    closeStepEditor,
  };

  if (error) {
    return <Typography variant="h3">Error.</Typography>;
  }

  if (!routine) {
    return <Typography variant="h3">Loading...</Typography>;
  }

  return (
    <RoutineContext.Provider value={contextValue}>
      <RoutineEditor
        routine={routine}
        onChange={setRoutine}
        dirty={dirty}
        isNew={createNew}
        // optional actions
        onDelete={handleDelete}
      />

      <SaveCancelFabs
        disableSubmit={!dirty || !routine.name}
        disableCancel={!dirty}
        onSubmit={createNew ? handleSubmitNew : handleSubmitEdit}
        onCancel={handleReset}
      />
    </RoutineContext.Provider>
  );
}

export default RoutinePage;
export { RoutineContext };
