import { useEffect, useState } from 'react';

function useDirtyData({ original }) {
  const [{ data, isDirty }, setStateInternal] = useState({
    data: original,
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
      data: original,
      isDirty: false,
    });
  };

  useEffect(() => {
    reset();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [original]);

  return [data, setState, isDirty, reset];
}

export default useDirtyData;
