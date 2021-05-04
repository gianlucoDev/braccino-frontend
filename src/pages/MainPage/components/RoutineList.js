import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  full: {
    height: '100%',
    width: '100%',
  },
}));

function RoutineList({ routines }) {
  const classes = useStyles();

  return (
    <GridList cellHeight="auto" cols={3}>
      {routines.map(({ id, name, steps }) => (
        <GridListTile key={id}>
          <Card className={classes.full}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Steps: {steps.length}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={RouterLink}
                to={`/routines/${id}`}
              >
                Modifica
              </Button>
            </CardActions>
          </Card>
        </GridListTile>
      ))}

      <GridListTile>
        <Card className={classes.full}>
          <ButtonBase
            className={classes.full}
            component={RouterLink}
            to="/routines/new"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <AddIcon style={{ fontSize: '5em' }} />
              <Typography>Aggiungi una routine</Typography>
            </Box>
          </ButtonBase>
        </Card>
      </GridListTile>
    </GridList>
  );
}

export default RoutineList;
