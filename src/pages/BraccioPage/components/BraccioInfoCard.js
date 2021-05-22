import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function BraccioInfoCard({ braccio }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Braccio
        </Typography>

        <Typography variant="h6">Nome scheda</Typography>
        <Typography color="textSecondary" gutterBottom>
          {braccio.name}
        </Typography>

        <Typography variant="h6">Stato connessione seriale</Typography>
        <Typography color="textSecondary" gutterBottom>
          {braccio.connection_status.code} (
          {braccio.connection_status.ok ? 'OK' : 'NOT OK'})
        </Typography>

        <Typography variant="h6">Numero di serie</Typography>
        <Typography color="textSecondary" gutterBottom>
          {braccio.serial_number}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BraccioInfoCard;
