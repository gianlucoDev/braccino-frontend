import { useContext } from 'react';
import Button from '@material-ui/core/Button';

import { RoutineStateContext } from 'pages/RoutinePage/RoutinePage';

function downloadJson(fileName, json) {
  const dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(json, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', fileName);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function RoutineExportButton({ onExport, ...props }) {
  const { state } = useContext(RoutineStateContext);
  const { routine } = state;

  const handleExport = () => {
    // copy all properties from routine into data, except for the id property
    const { id, ...data } = routine;
    downloadJson(routine.name + '.json', data);

    if (onExport) onExport();
  };

  return (
    <Button onClick={handleExport} {...props}>
      Esporta
    </Button>
  );
}

export default RoutineExportButton;
