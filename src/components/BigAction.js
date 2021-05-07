import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  fullSize: {
    height: '100%',
    width: '100%',
  },
}));

function BigAction({ direction = 'column', icon: IconComponent, children, ...props }) {
  const classes = useStyles();

  return (
    <ButtonBase className={classes.fullSize} focusRipple {...props}>
      <Box
        display="flex"
        flexDirection={direction}
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <IconComponent style={{ fontSize: '5em' }} />
        <Typography>{children}</Typography>
      </Box>
    </ButtonBase>
  );
}

export default BigAction;
