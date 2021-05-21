import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
  },
}));

function AppBarIconButton({ children, ...props }) {
  const classes = useStyles();

  return (
    <IconButton
      edge="start"
      color="inherit"
      className={classes.menuButton}
      {...props}
    >
      {children}
    </IconButton>
  );
}

export default AppBarIconButton;
