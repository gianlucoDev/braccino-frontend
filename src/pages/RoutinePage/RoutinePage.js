import { createContext, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import useSWR, { mutate } from 'swr';

import Typography from '@material-ui/core/Typography';

import {
  DEFAULT_ROUTINE,
  createRoutine,
  updateRoutine,
  deleteRoutine,
} from 'api/routines';

import RoutineEditor from './components/RoutineEditor/RoutineEditor';
import SaveCancelFabs from './components/SaveCancelFabs';

const RoutineContext = createContext();

function reducer(state, action) {
  const { type, ...args } = action;

  switch (type) {
    case 'swr-data': {
      const { data, error } = args;
      return {
        error,
        initial: data,
        routine: data,
        dirty: false,
        selectedStepIndex: null,
      };
    }

    case 'reset': {
      return { ...state, routine: state.initial };
    }

    case 'step-select': {
      const { index } = args;
      // TODO: check bounds
      return { ...state, selectedStepIndex: index };
    }

    case 'step-deselect': {
      return { ...state, selectedStepIndex: null };
    }

    // this action is needed while i migrate all the components to
    // use the dispather instead of callbacks
    // TODO: remove
    case 'mutate-routine': {
      const { routine } = args;
      return { ...state, routine };
    }

    default: {
      console.error('Unknow action', action);
      return state;
    }
  }
}

function useRoutineState(id, isNew) {
  const { data, error } = useSWR(isNew ? null : `/routines/${id}`);
  const initial = isNew ? DEFAULT_ROUTINE : data;

  const [state, dispatch] = useReducer(reducer, {
    error,
    initial,
    routine: initial,
    dirty: false,
    selectedStepIndex: null,
  });

  useEffect(() => {
    // overwrite current state whenever new data is fetched
    dispatch({ type: 'swr-data', data, error });
  }, [data, error]);

  return [state, dispatch];
}

function RoutinePage({ createNew = false, id }) {
  const history = useHistory();
  const [state, dispatch] = useRoutineState(id, createNew);
  const { error, dirty, routine, selectedStepIndex } = state;

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

  const handleDelete = async () => {
    await deleteRoutine(id);
    history.push('/');
  };

  const handleReset = () => {
    dispatch({ type: 'reset' });
  };

  // TODO: call dispatcher inside components
  const editStep = (index) => {
    dispatch({ type: 'step-select', index });
  };

  const closeStepEditor = () => {
    dispatch({ type: 'step-deselect' });
  };

  const setRoutine = (routine) => {
    dispatch({ type: 'mutate-routine', routine });
  };

  // utility function to avoid copying this snippet in all components
  const setSteps = (steps) => {
    setRoutine({
      ...routine,
      steps,
    });
  };

  if (error) {
    return <Typography variant="h3">Error.</Typography>;
  }

  if (!routine) {
    return <Typography variant="h3">Loading...</Typography>;
  }

  // TODO: create new context, pass down state and dispatch instead of this mess
  const selectedStep =
    selectedStepIndex !== null
      ? selectedStepIndex >= 0 && selectedStepIndex < routine.steps.length
        ? routine.steps[selectedStepIndex]
        : null
      : null;

  const contextValue = {
    // routine state
    routine,
    selectedStep,
    selectedStepIndex,

    // editor state
    dirty,
    isNew: createNew,

    // callbacks
    setRoutine,
    setSteps,
    editStep,
    closeStepEditor,
  };

  return (
    <RoutineContext.Provider value={contextValue}>
      <RoutineEditor
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
