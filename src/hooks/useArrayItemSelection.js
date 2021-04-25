import { useMemo } from 'react';
import { useState } from 'react';

function useArrayItemSelection(arr, initialIndex = null) {
  const [index, setIndexInternal] = useState(initialIndex);

  const setIndex = (newIndex) => {
    if (newIndex === null || newIndex < 0 || newIndex >= arr.length) {
      setIndexInternal(null);
    } else {
      setIndexInternal(newIndex);
    }
  };

  const item = useMemo(() => {
    if (index === null || index < 0 || index >= arr.length) {
      return null;
    }

    return arr[index];
  }, [arr, index]);

  return [item, setIndex, index];
}

export default useArrayItemSelection;
