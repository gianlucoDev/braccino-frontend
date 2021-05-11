import { useMemo } from 'react';
import { useState } from 'react';

function useArrayItemSelection(arr, initialIndex = null) {
  const [index, setIndex] = useState(initialIndex);

  const item = useMemo(() => {
    if (index === null || index < 0 || index >= arr.length) {
      return null;
    }

    return arr[index];
  }, [arr, index]);

  return [item, index, setIndex];
}

export default useArrayItemSelection;
