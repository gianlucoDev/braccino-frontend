import { ReadyState } from 'react-use-websocket';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function SocketInfoCard({ readyState }) {
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          WebSocket
        </Typography>

        <Typography variant="h6">Stato connessione</Typography>
        <Typography color="textSecondary" gutterBottom>
          {connectionStatus}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SocketInfoCard;
