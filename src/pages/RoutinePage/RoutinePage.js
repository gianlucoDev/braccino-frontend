import { useHistory } from 'react-router-dom';
import useSWR from 'swr';

import Typography from '@material-ui/core/Typography';

import useDirtyData from '../../hooks/useDirtyData';
import RoutineEditor from './components/RoutineEditor';

import { BASE_URL } from '../../fetcher';
const DEFAULT_ROUTINE = { name: '', steps: [] };

const create = async (routine) => {
  const res = await fetch(BASE_URL + `/routines`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(routine),
  });

  // TODO: handle non-200 responses
  return await res.json();
};

const update = async (routine, id) => {
  const res = await fetch(BASE_URL + `/routines/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(routine),
  });

  return await res.json();
};

function EditRoutinePage({ createNew = false, id }) {
  const history = useHistory();

  const { data, error, mutate } = useSWR(createNew ? null : `/routines/${id}`);
  const [state, setState, dirty, reset] = useDirtyData(
    createNew ? DEFAULT_ROUTINE : data
  );

  const handleSubmitNew = async () => {
    const created = await create(state);

    // navigate to newly created routine
    history.push(`/routines/${created.id}`);
  };

  const handleSubmitEdit = async () => {
    await update(state, id);

    // trigger re-validation
    mutate();
  };

  const handleReset = () => {
    reset();
  };

  if (error) {
    return <Typography variant="h3">Error.</Typography>;
  }

  if (!state) {
    return <Typography variant="h3">Loading...</Typography>;
  }

  return (
    <RoutineEditor
      routine={state}
      enableSubmitCancel={dirty}
      onChange={setState}
      onSubmit={createNew ? handleSubmitNew : handleSubmitEdit}
      onCancel={handleReset}
    />
  );
}

export default EditRoutinePage;
