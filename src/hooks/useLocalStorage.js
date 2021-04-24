import { useState } from 'react';

function useLocalStorage(key) {
  const [state, setState] = useState(localStorage.getItem(key));

  const update = (value) => {
    localStorage.setItem(key, value);
    setState(value);
  };

  return [state, update];
}

export default useLocalStorage;
