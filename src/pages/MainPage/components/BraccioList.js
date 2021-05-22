import { Link as RouterLink } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import InputIcon from '@material-ui/icons/Input';

import { useBraccioList } from 'api/braccio';

function BraccioList() {
  const { data, error } = useBraccioList();

  if (error) {
    return <Typography>Error.</Typography>;
  }

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {data.map(({ serial_number, name, connection_status }) => (
        <Grid item xs={12} sm={6} md={4} key={serial_number}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>

              <Typography variant="body1">Connetion status</Typography>
              <Typography color="textSecondary">
                {connection_status.code}
              </Typography>

              <Typography variant="body1">Serial number</Typography>
              <Typography color="textSecondary">{serial_number}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                startIcon={<InputIcon />}
                component={RouterLink}
                to={`/braccio/${serial_number}`}
              >
                Controlla braccio
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default BraccioList;
