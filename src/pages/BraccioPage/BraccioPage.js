import { useParams } from 'react-router';
import { ReadyState } from 'react-use-websocket';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import WifiIcon from '@material-ui/icons/Wifi';

import { useBraccio, useBraccioSocket } from 'api/braccio';
import BraccioAppBar from 'components/BraccioAppBar';
import BigMessage from 'components/BigMessage';

import BraccioPositionEditor from './components/BraccioPositionEditor';
import BraccioSpeedEditor from './components/BraccioSpeedEditor';
import BraccioInfoCard from './components/BraccioInfoCard';
import SocketInfoCard from './components/SocketInfoCard';

function BraccioPage() {
  const { serial_number } = useParams();
  const { data, error } = useBraccio(serial_number);
  const { readyState, speed, position, setSpeed, setPosition } =
    useBraccioSocket(serial_number);

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
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box marginTop={4}>
              <BraccioInfoCard braccio={data} />
            </Box>

            <Box marginTop={4}>
              <SocketInfoCard readyState={readyState} />
            </Box>
          </Grid>

          {readyState === ReadyState.OPEN ? (
            <Grid item xs={12} md={6}>
              <Box marginTop={4}>
                <BraccioSpeedEditor speed={speed} onChange={setSpeed} />
              </Box>
              <Box marginTop={4}>
                <BraccioPositionEditor
                  position={position}
                  onChange={setPosition}
                />
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12} md={6}>
              <BigMessage
                IconComponent={WifiIcon}
                message="Connessione in corso"
                suggestion="Attendi un attimo..."
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default BraccioPage;
