import { useContext } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import ListIcon from '@material-ui/icons/ListAlt';

import BigMessage from 'components/BigMessage';

import { RoutineContext } from 'pages/RoutinePage/RoutinePage';
import StepList from './StepList/StepList';
import StepEditor from './StepEditor/StepEditor';

function StepListEditorWide() {
  const { routine, selectedStep } = useContext(RoutineContext);

  return (
    <Box padding={2}>
      <Grid container>
        <Grid item xs={6}>
          <StepList />
        </Grid>

        <Grid item xs={6}>
          {selectedStep === null ? (
            <Box height="100%">
              {routine.steps.length > 0 ? (
                <BigMessage
                  IconComponent={ListIcon}
                  message="Nessuno step selezionato"
                  suggestion="Puoi selezionarne uno dal pannello a sinistra"
                />
              ) : (
                <BigMessage
                  IconComponent={ListIcon}
                  message="Non ci sono step"
                  suggestion="Puoi crearne uno dal pannello a sinistra"
                />
              )}
            </Box>
          ) : (
            <Box padding={2}>
              <StepEditor />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default StepListEditorWide;
