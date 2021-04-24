import { Link as RouterLink } from 'react-router-dom';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function RoutineList({ routines }) {
  return (
    <GridList cellHeight="auto" cols={3}>
      {routines.map(({ id, name, steps }) => (
        <GridListTile key={id}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Steps: {steps.length}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={RouterLink} to={`/routines/${id}`}>
                Modifica
              </Button>
            </CardActions>
          </Card>
        </GridListTile>
      ))}
    </GridList>
  );
}

export default RoutineList;
