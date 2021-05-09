import { Link as RouterLink } from 'react-router-dom';
import useSWR from 'swr';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import { deleteRoutine } from '../../../api/routines';
import BigAction from '../../../components/BigAction';

const useStyles = makeStyles((theme) => ({
  card_size: {
    height: '10em',
    width: '100%',
  },
}));

function RoutineList() {
  const classes = useStyles();
  const { data, error, mutate } = useSWR('/routines');

  const handleRoutineDelete = async (id) => {
    await deleteRoutine(id);

    // trigger re-validation
    mutate();
  };

  if (error) {
    return <Typography>Error.</Typography>;
  }

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {data.map(({ id, name, steps }) => (
        <Grid item xs={12} sm={6} md={4} key={id}>
          <Card className={classes.card_size}>
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
                startIcon={<EditIcon />}
                component={RouterLink}
                to={`/routines/${id}`}
              >
                Modifica
              </Button>
              <Button
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => handleRoutineDelete(id)}
              >
                Elimina
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}

      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card_size}>
          <BigAction
            IconComponent={AddIcon}
            action="Aggiungi una routine"
            component={RouterLink}
            to="/routines/new"
          />
        </Card>
      </Grid>
    </Grid>
  );
}

export default RoutineList;
