import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  full: {
    height: '100%',
    width: '100%',
  },
}));

function CardButton({ onClick, text }) {
  const classes = useStyles();

  return (
    <Card className={classes.full}>
      <ButtonBase className={classes.full} onClick={onClick}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <AddIcon style={{ fontSize: '5em' }} />
          <Typography>{text}</Typography>
        </Box>
      </ButtonBase>
    </Card>
  );
}

export default CardButton;
