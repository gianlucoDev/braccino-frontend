import { Link as RouterLink, useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DarkModeIcon from '@material-ui/icons/Brightness2';
import LightModeIcon from '@material-ui/icons/Brightness6';

import useDarkMode from 'hooks/useDarkMode';
import AppBarIconButton from './AppBarIconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function BraccioAppBar({ extraButtons, children }) {
  const classes = useStyles();
  const location = useLocation();
  const { isDarkMode, setDarkMode } = useDarkMode();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <AppBarIconButton aria-label="menu" component={RouterLink} to="/">
            {location.pathname === '/' ? <HomeIcon /> : <ArrowBackIcon />}
          </AppBarIconButton>
          <Typography variant="h6" className={classes.title}>
            Braccio
          </Typography>

          {extraButtons}

          <AppBarIconButton
            aria-label={
              isDarkMode ? 'Attiva modalità chiara' : 'Attiva modalità scura'
            }
            onClick={() => setDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </AppBarIconButton>
          <Button color="inherit">Login</Button>
        </Toolbar>

        {children}
      </AppBar>
    </div>
  );
}

export default BraccioAppBar;
