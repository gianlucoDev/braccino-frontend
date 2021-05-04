import useSWR from 'swr';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function BraccioList() {
  const { data, error } = useSWR('/braccio');

  if (error) {
    return <Typography>Error.</Typography>;
  }

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <GridList cellHeight="auto" cols={3}>
      {data.map(({ id, name, serial }) => (
        <GridListTile key={id}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Serial: {serial}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => alert('Non ancora impementato')}
              >
                Attiva
              </Button>
            </CardActions>
          </Card>
        </GridListTile>
      ))}
    </GridList>
  );
}

export default BraccioList;
