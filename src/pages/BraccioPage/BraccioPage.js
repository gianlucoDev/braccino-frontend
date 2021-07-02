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

import PositionInput from 'components/inputs/PositionInput';
import SpeedInput from 'components/inputs/SpeedInput';
import GripperInput from 'components/inputs/GripperInput';

import BraccioInfoCard from './components/BraccioInfoCard';
import SocketInfoCard from './components/SocketInfoCard';

function BraccioPage() {
  const { serial_number } = useParams();
  const { data, error } = useBraccio(serial_number);
  const { socketState, state, update } = useBraccioSocket(serial_number);

  const updateKey = (key) => (value) => {
    update({
      ...state,
      [key]: value,
    });
  };

  const gripper = {
    attack_angle: state.attack_angle,
    gripper: state.gripper,
    gripper_rot: state.gripper_rot,
  };

  const updateGripper = (gripper) => {
    update({
      ...state,
      ...gripper,
    });
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box marginTop={4}>
              <BraccioInfoCard braccio={data} />
            </Box>

            <Box marginTop={4}>
              <SocketInfoCard readyState={socketState} />
            </Box>
          </Grid>

          {socketState === ReadyState.OPEN ? (
            <Grid item xs={12} md={6}>
              <Box marginTop={4}>
                <PositionInput
                  position={state.position}
                  onChange={updateKey('position')}
                />
              </Box>
              <Box marginTop={4}>
                <GripperInput gripper={gripper} onChange={updateGripper} />
              </Box>
              <Box marginTop={4}>
                <SpeedInput speed={state.speed} onChange={updateKey('speed')} />
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
