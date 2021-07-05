import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ImportExportIcon from '@material-ui/icons/ImportExport';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import AppBarIconButton from 'components/AppBarIconButton';

import RoutineImportButton from './RoutineImportButton';
import RoutineExportButton from './RoutineExportButton';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1, 0),
  },
}));

function RoutineImportExportButton() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* button */}
      <AppBarIconButton
        aria-label="importa o esporta routine"
        onClick={handleClickOpen}
      >
        <ImportExportIcon />
      </AppBarIconButton>

      {/* dialog */}
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

          <RoutineImportButton
            fullWidth
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            className={classes.button}
            onImport={handleClose}
          />
          <RoutineExportButton
            fullWidth
            variant="outlined"
            startIcon={<CloudDownloadIcon />}
            className={classes.button}
            onExport={handleClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RoutineImportExportButton;
