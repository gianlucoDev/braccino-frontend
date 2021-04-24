import { useEffect, useState } from 'react';

function useDirtyData({ original }) {
  const [state, setStateInternal] = useState();
  const [isDirty, setDirty] = useState(false);

  const setState = (state) => {
    setStateInternal(state);
    setDirty(true);
  };

  const reset = () => {
    setStateInternal(original);
    setDirty(false);
  };

  useEffect(() => {
    reset();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [original]);

  return [state, setState, isDirty, reset];
}

export default useDirtyData;
