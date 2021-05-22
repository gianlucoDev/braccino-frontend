import { createContext, useEffect, useReducer } from 'react';
import useSWR, { mutate } from 'swr';

import Typography from '@material-ui/core/Typography';

import history from '../../history';

import {
  DEFAULT_ROUTINE,
  createRoutine,
  updateRoutine,
  deleteRoutine,
} from 'api/routines';
import { DEFAULT_STEP } from 'api/steps';

import RoutineEditor from './components/RoutineEditor/RoutineEditor';
import SaveCancelFabs from './components/SaveCancelFabs';

// TODO: delete this context once all components have been migrated to the other context
const RoutineContext = createContext();

const RoutineStateContext = createContext();

function reducer(state, action) {
  // helper functions
  const setRoutine = (routine) => {
    return {
      ...state,
      routine,
      dirty: true,
    };
  };

  // reducer
  const { type, ...args } = action;

  switch (type) {
    case 'swr-data': {
      const { data, error } = args;
      return {
        ...state,
        error,
        initial: data,
        routine: data,
        dirty: false,
      };
    }

    case 'reset': {
      return { ...state, dirty: false, routine: state.initial };
    }

    case 'routine-save': {
      const { isNew, routine } = state;

      if (isNew) {
        createRoutine(routine).then((created) => {
          // preload the data so the next page loads instantly
          mutate(`/routines/${created.id}`, routine, false);

          // navigate to newly created routine
          history.push(`/routines/${created.id}`);
        });
      } else {
        updateRoutine(routine.id, routine).then(() => {
          // trigger re-validation
          mutate(`/routines/${routine.id}`);
        });
      }

      // does not mutate state
      return state;
    }

    case 'routine-delete': {
      const { isNew, routine } = state;

      if (isNew) {
        console.error(
          'attempting to delete a routine that has not been saved yet',
          action
        );
        return;
      }

      deleteRoutine(routine.id).then(() => history.push('/'));
      // return current state just because I have to return something
      // the component will unmount anyways because the route gets changed
      return state;
    }

    case 'routine-import': {
      const { importedRoutine } = args;
      return setRoutine({
        ...importedRoutine,
        // ensure current ID is no overwritten by imported data
        id: state.routine.id,
      });
    }

    case 'routine-rename': {
      const { name } = args;
      return setRoutine({
        ...state.routine,
        name,
      });
    }

    case 'step-select': {
      const { index } = args;
      const { routine } = state;

      const selectedStepIndex =
        index < 0 || index >= routine.steps.length ? null : index;
      return { ...state, selectedStepIndex };
    }

    case 'step-deselect': {
      return { ...state, selectedStepIndex: null };
    }

    case 'step-create': {
      const { steps } = state.routine;

      const templateStep = steps[steps.length - 1] || DEFAULT_STEP;
      const newSteps = [...steps, { ...templateStep }];

      return {
        ...state,
        dirty: true,
        selectedStepIndex: newSteps.length - 1,

        routine: {
          ...state.routine,
          steps: newSteps,
        },
      };
    }

    case 'step-delete': {
      const { index } = args;
      const { steps } = state.routine;

      const newSteps = [...steps];
      newSteps.splice(index, 1);

      // keep current selection if the deleted item is not the currently selected one
      const selectedStepIndex =
        state.selectedStepIndex === index ? null : state.selectedStepIndex;

      return {
        ...state,
        dirty: true,
        selectedStepIndex,

        routine: {
          ...state.routine,
          steps: newSteps,
        },
      };
    }

    // this action is needed while i migrate all the components to
    // use the dispather instead of callbacks
    // TODO: remove
    case 'mutate-routine': {
      const { routine } = args;
      return {
        ...state,
        dirty: true,
        routine,
      };
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
    isNew,
    dirty: false,
    selectedStepIndex: null,
  });

  // overwrite current state whenever new data is fetched
  useEffect(() => {
    if (!isNew) {
      dispatch({ type: 'swr-data', data, error });
    }
  }, [isNew, data, error]);

  return [state, dispatch];
}

function RoutinePage({ createNew = false, id }) {
  const [state, dispatch] = useRoutineState(id, createNew);
  const { error, dirty, routine, selectedStepIndex } = state;

  // action handling
  // TODO: call dispatcher inside components
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
  };

  const value = { state, dispatch };

  return (
    <RoutineContext.Provider value={contextValue}>
      <RoutineStateContext.Provider value={value}>
        <RoutineEditor />

        <SaveCancelFabs />
      </RoutineStateContext.Provider>
    </RoutineContext.Provider>
  );
}

export default RoutinePage;
export { RoutineContext, RoutineStateContext };
