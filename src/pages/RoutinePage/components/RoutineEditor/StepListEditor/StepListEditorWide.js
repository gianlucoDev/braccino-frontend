import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import ListIcon from '@material-ui/icons/ListAlt';

import BigMessage from 'components/BigMessage';

import StepList from './StepList/StepList';
import StepEditor from './StepEditor/StepEditor';

function StepListEditorWide({
  steps,
  selectedIndex,
  selectedStep,
  onStepSelect,
  onNewStep,
  onStepChange,
  onStepDelete,
}) {
  return (
    <Box padding={2}>
      <Grid container>
        <Grid item xs={6}>
          <StepList
            steps={steps}
            activeItem={selectedIndex}
            onDelete={onStepDelete}
            onEdit={onStepSelect}
            onAdd={onNewStep}
          />
        </Grid>

        <Grid item xs={6}>
          {selectedStep === null ? (
            <Box height="100%">
              {steps ? (
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
              <StepEditor step={selectedStep} onChange={onStepChange} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default StepListEditorWide;
