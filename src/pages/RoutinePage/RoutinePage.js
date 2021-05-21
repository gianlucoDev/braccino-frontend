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

import RoutineEditor from './components/RoutineEditor/RoutineEditor';
import SaveCancelFabs from './components/SaveCancelFabs';

function RoutinePage({ createNew = false, id }) {
  const history = useHistory();

  const { data, error } = useSWR(createNew ? null : `/routines/${id}`);
  const [state, setState, dirty, reset] = useDirtyData(
    createNew ? DEFAULT_ROUTINE : data
  );

  const handleSubmitNew = async () => {
    const created = await createRoutine(state);

    // preload the data so the next page loads instantly
    mutate(`/routines/${created.id}`, state, false);

    // navigate to newly created routine
    history.push(`/routines/${created.id}`);
  };

  const handleSubmitEdit = async () => {
    await updateRoutine(id, state);

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

  if (error) {
    return <Typography variant="h3">Error.</Typography>;
  }

  if (!state) {
    return <Typography variant="h3">Loading...</Typography>;
  }

  return (
    <>
      <RoutineEditor
        routine={state}
        onChange={setState}
        dirty={dirty}
        isNew={createNew}
        // optional actions
        onDelete={handleDelete}
      />

      <SaveCancelFabs
        disableSubmit={!dirty || !state.name}
        disableCancel={!dirty}
        onSubmit={createNew ? handleSubmitNew : handleSubmitEdit}
        onCancel={handleReset}
      />
    </>
  );
}

export default RoutinePage;
