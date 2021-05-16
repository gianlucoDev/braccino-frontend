import { useParams } from 'react-router';
import useSWR from 'swr';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';

import BraccioAppBar from 'components/BraccioAppBar';

function BraccioPage() {
  const { serial_number } = useParams();
  const { data, error } = useSWR(`/braccio/${serial_number}`);

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

          <Typography variant="h4">Connetion status</Typography>
          <Typography color="textSecondary">
            {data.connection_status.code} (data.connection_status.ok ? 'OK' :
            'NOT OK')
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
        </Box>
      </Container>
    </>
  );
}

export default BraccioPage;
