import { useParams } from 'react-router';
import useSWR from 'swr';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import BraccioAppBar from 'components/BraccioAppBar';

const BASE_URL_WS = 'ws://localhost:8000/ws';

function BraccioPage() {
  const { serial_number } = useParams();
  const { data, error } = useSWR(`/braccio/${serial_number}`);
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    `${BASE_URL_WS}/braccio/${serial_number}/`
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const handleSendMessage = () => {
    sendJsonMessage({ hello: 'world', time: Date.now() });
  };

  if (error) {
    return <Typography>Error.</Typography>;
  }

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <BraccioAppBar />
      <Container>
        <Box marginTop={2}>
          <Typography variant="h2" gutterBottom>
            {data.name}
          </Typography>

          <Typography variant="h4">Arduino connetion status</Typography>
          <Typography color="textSecondary">
            {data.connection_status.code} (
            {data.connection_status.ok ? 'OK' : 'NOT OK'})
          </Typography>

          <Typography variant="h4">Serial number</Typography>
          <Typography color="textSecondary">{data.serial_number}</Typography>

          <Typography variant="h4">Current action</Typography>
          {data.current_action ? (
            <Typography color="textSecondary">
              {data.current_action.name} (
              {data.current_action.is_running ? 'running' : 'not running'})
            </Typography>
          ) : (
            <Typography color="textSecondary">
              Non sta svoglendo nulla
            </Typography>
          )}

          <Typography variant="h4">WebSocket connection status</Typography>
          <Typography color="textSecondary">{connectionStatus}</Typography>

          <Typography variant="h4">Last message</Typography>
          <pre>{JSON.stringify(lastJsonMessage, null, 2)}</pre>

          {readyState === ReadyState.OPEN && (
            <Button onClick={handleSendMessage}>invia messaggio</Button>
          )}
        </Box>
      </Container>
    </>
  );
}

export default BraccioPage;
