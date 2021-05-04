import { useEffect, useState } from 'react';

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

  const reset = () => {
    setStateInternal({
      data: initial,
      isDirty: false,
    });
  };

  useEffect(() => {
    reset();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  return [data, setState, isDirty, reset];
}

export default useDirtyData;
