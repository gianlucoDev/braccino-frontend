import { Link as RouterLink } from 'react-router-dom';
import useSWR from 'swr';

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

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import { BASE_URL } from '../../../fetcher';

const deleteRoutine = async (id) => {
  await fetch(BASE_URL + `/routines/${id}`, {
    method: 'DELETE',
  });
};

const useStyles = makeStyles((theme) => ({
  full: {
    height: '100%',
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
        <Card className={classes.full}>
          <ButtonBase
            focusRipple
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
