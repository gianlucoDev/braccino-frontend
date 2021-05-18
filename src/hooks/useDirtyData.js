import { useCallback, useEffect, useState } from 'react';

function useDirtyData(initial) {
  const [{ data, isDirty }, setStateInternal] = useState({
    data: initial,
    isDirty: false,
  });

  const setState = (state) => {
    setStateInternal({
      data: state,
      isDirty: true,
    });
  };

  const reset = useCallback(() => {
    setStateInternal({
      data: initial,
      isDirty: false,
    });
  }, [initial]);

  useEffect(() => {
    reset();

    // if the initial data is changed
    // reset() will be re-defined so this will trigger
  }, [reset]);

  return [data, setState, isDirty, reset];
}

export default useDirtyData;
