import { Link as RouterLink } from 'react-router-dom';
import useSWR from 'swr';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
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
    <GridList cellHeight="auto" cols={3}>
      {data.map(({ id, name, steps }) => (
        <GridListTile key={id}>
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
        </GridListTile>
      ))}

      <GridListTile>
        <Card className={classes.card_size}>
          <BigAction
            IconComponent={AddIcon}
            action="Aggiungi una routine"
            component={RouterLink}
            to="/routines/new"
          />
        </Card>
      </GridListTile>
    </GridList>
  );
}

export default RoutineList;
