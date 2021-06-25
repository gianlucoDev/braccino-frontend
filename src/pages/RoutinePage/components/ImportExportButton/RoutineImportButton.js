import { useContext, useRef } from 'react';

import Button from '@material-ui/core/Button';

import { RoutineStateContext } from 'pages/RoutinePage/RoutinePage';

function RoutineImportButton({ onImport, ...props }) {
  const { dispatch } = useContext(RoutineStateContext);

  const fileInput = useRef(null);

  const handleImportButtonClick = () => {
    fileInput.current.click();
  };

  const handleImportFileSelected = (event) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const routineJson = JSON.parse(text);
      handleImport(routineJson);
    };
    reader.readAsText(file);

    if (onImport) onImport();
  };

  const handleImport = (importedRoutine) => {
    dispatch({ type: 'routine-import', importedRoutine });
  };

  return (
    <>
      <Button onClick={handleImportButtonClick} {...props}>
        Importa
      </Button>
      <input
        type="file"
        ref={fileInput}
        accept="application/json"
        style={{ display: 'none' }}
        onChange={handleImportFileSelected}
      />
    </>
  );
}

export default RoutineImportButton;
