import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function InputContainer({ expanded, onExpandedChange, heading, children }) {
  const summaryChildren =
    typeof heading !== 'string' ? (
      heading
    ) : (
      <Typography variant="h6">{heading}</Typography>
    );

  return (
    <Accordion expanded={expanded} onChange={onExpandedChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {summaryChildren}
      </AccordionSummary>

      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

export default InputContainer;
