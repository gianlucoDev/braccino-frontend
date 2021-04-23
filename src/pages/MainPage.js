import useSWR from 'swr';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BraccioAppBar from '../components/BraccioAppBar';

function MainPage() {
  const { data, error } = useSWR('/braccio/');

  if (error) return <p>Error.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <>
      <BraccioAppBar />
      {data.map(({ id, name, serial }) => (
        <Card key={id}>
          <CardContent>
            <Typography>Name: {name}</Typography>
            <Typography>Serial: {serial}</Typography>
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
      ))}
    </>
  );
}

export default MainPage;
