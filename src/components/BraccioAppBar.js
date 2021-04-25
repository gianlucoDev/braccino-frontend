import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import DarkModeIcon from '@material-ui/icons/Brightness2';
import LightModeIcon from '@material-ui/icons/Brightness6';

import { useDarkMode } from './DarkModeProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function BraccioAppBar() {
  const classes = useStyles();
  const { isDarkMode, setDarkMode } = useDarkMode();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Braccio
          </Typography>

          <IconButton
            edge="start"
            color="inherit"
            className={classes.menuButton}
            aria-label={
              isDarkMode ? 'Attiva modalità chiara' : 'Attiva modalità scura'
            }
            onClick={() => setDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default BraccioAppBar;
