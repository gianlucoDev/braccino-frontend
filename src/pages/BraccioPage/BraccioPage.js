import { useParams } from 'react-router';
import { ReadyState } from 'react-use-websocket';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { useBraccio, useBraccioSocket } from 'api/braccio';
import BraccioAppBar from 'components/BraccioAppBar';

import BraccioPositionEditor from './components/BraccioPositionEditor';
import BraccioSpeedEditor from './components/BraccioSpeedEditor';

function BraccioPage() {
  const { serial_number } = useParams();
  const { data, error } = useBraccio(serial_number);
  const { readyState, speed, position, setSpeed, setPosition } =
    useBraccioSocket(serial_number);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

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
        <Box marginY={2}>
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
          {data.running ? (
            <Typography color="textSecondary">{data.running.name}</Typography>
          ) : (
            <Typography color="textSecondary">
              Non sta svoglendo nulla
            </Typography>
          )}

          <Typography variant="h4">WebSocket connection status</Typography>
          <Typography color="textSecondary">{connectionStatus}</Typography>

          {readyState === ReadyState.OPEN && (
            <>
              <Box paddingY={2}>
                <BraccioSpeedEditor speed={speed} onChange={setSpeed} />
              </Box>

              <Box paddingY={2}>
                <BraccioPositionEditor
                  position={position}
                  onChange={setPosition}
                />
              </Box>
            </>
          )}
        </Box>
      </Container>
    </>
  );
}

export default BraccioPage;
