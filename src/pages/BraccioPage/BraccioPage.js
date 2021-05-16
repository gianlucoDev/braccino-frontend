import { useState } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { DEFAULT_JOINT_POSITIONS } from 'api/joints';
import BraccioAppBar from 'components/BraccioAppBar';
import BraccioPositionEditor from './components/BraccioPositionEditor';

const BASE_URL_WS = 'ws://localhost:8000/ws';

function BraccioPage() {
  const { serial_number } = useParams();
  const { data, error } = useSWR(`/braccio/${serial_number}`);
  const { sendJsonMessage, readyState } = useWebSocket(
    `${BASE_URL_WS}/braccio/${serial_number}/`
  );

  const [targetPosition, setTargetPosition] = useState(DEFAULT_JOINT_POSITIONS);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const handleTargetPositionChange = (pos) => {
    sendJsonMessage(pos);
    setTargetPosition(pos);
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

          {readyState === ReadyState.OPEN && (
            <BraccioPositionEditor
              position={targetPosition}
              onChange={handleTargetPositionChange}
            />
          )}
        </Box>
      </Container>
    </>
  );
}

export default BraccioPage;
