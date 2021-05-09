import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';

import BigMessage from './BigMessage';

const useStyles = makeStyles((theme) => ({
  fullSize: {
    height: '100%',
    width: '100%',
  },
}));

function BigAction({
  direction = 'column',
  IconComponent,
  action,
  ...props
}) {
  const classes = useStyles();

  return (
    <ButtonBase className={classes.fullSize} focusRipple {...props}>
      <BigMessage
        IconComponent={IconComponent}
        direction={direction}
        message={action}
      />
    </ButtonBase>
  );
}

export default BigAction;
