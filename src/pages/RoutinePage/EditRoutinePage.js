import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import useDirtyData from '../../hooks/useDirtyData';
import RoutineEditor from './components/RoutineEditor';

import { BASE_URL } from '../../fetcher';

function EditRoutinePage() {
  const { id } = useParams();
  const { data, error, mutate } = useSWR(`/routines/${id}`);
  const [state, setState, dirty, reset] = useDirtyData(data);

  const handleSubmit = async () => {
    await fetch(BASE_URL + `/routines/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    });

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

export default EditRoutinePage;
