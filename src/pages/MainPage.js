import useSWR from 'swr';

import GridList from '@material-ui/core/GridList';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function MainPage() {
  const { data, error } = useSWR('/braccio/');

  if (error) return <p>Error.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <>
      <Typography gutterBottom variant="h3" component="h1">
        Bracci collegati
      </Typography>

      <GridList cellHeight="auto" cols={3}>
        {data.map(({ id, name, serial }) => (
          <Box m={1}>
            <Card key={id}>
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
          </Box>
        ))}
      </GridList>
    </>
  );
}

export default MainPage;
