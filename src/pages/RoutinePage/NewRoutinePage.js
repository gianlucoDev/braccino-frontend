import { useHistory } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import useDirtyData from '../../hooks/useDirtyData';
import RoutineEditor from './components/RoutineEditor';

import { BASE_URL } from '../../fetcher';
const DEFAULT_ROUTINE = { name: '', steps: [] };

function NewRoutinePage() {
  const history = useHistory();
  const [state, setState, dirty, reset] = useDirtyData(DEFAULT_ROUTINE);

  const handleSubmit = async () => {
    const res = await fetch(BASE_URL + `/routines`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    });
    const createdRoutine = await res.json();

    // TODO: validate user input
    // TODO: handle non-200 responses

    // navigate to newly created routine
    history.push(`/routines/${createdRoutine.id}`);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Box padding={2}>
      <RoutineEditor
        routine={state}
        enableSubmitCancel={dirty}
        onChange={setState}
        onSubmit={handleSubmit}
        onCancel={handleReset}
      />
    </Box>
  );
}

export default NewRoutinePage;
