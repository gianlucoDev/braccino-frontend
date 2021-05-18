import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ImportExportIcon from '@material-ui/icons/ImportExport';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import AppBarIconButton from 'components/AppBarIconButton';

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

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1, 0),
  },
}));

function RoutineImportExportButton({ routine }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImport = () => {
    setOpen(false);
  };

  const handleExport = () => {
    // copy all properties from routine into data, except for the id property
    const { id, ...data } = routine;
    downloadJson(routine.name + '.json', data);
    setOpen(false);
  };

  return (
    <>
      <AppBarIconButton
        aria-label="importa o esporta routine"
        onClick={handleClickOpen}
      >
        <ImportExportIcon />
      </AppBarIconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="import-export-dialog-title"
        aria-describedby="import-export-dialog-description"
      >
        <DialogTitle id="import-export-dialog-title">
          Import / Export
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="import-export-dialog-description">
            Vuoi esportare la routine corrente in file <code>.json</code> oppure
            importare un file e sostituire la routine corrente con esso?
          </DialogContentText>
          {/* TODO: padding top and bottom */}
          <Button
            fullWidth
            variant="outlined"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            onClick={handleImport}
          >
            Importa
          </Button>
          <Button
            fullWidth
            variant="outlined"
            className={classes.button}
            startIcon={<CloudDownloadIcon />}
            onClick={handleExport}
          >
            Esporta
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RoutineImportExportButton;
