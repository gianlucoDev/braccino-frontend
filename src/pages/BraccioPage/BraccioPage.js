import { useParams } from 'react-router';

import Typography from '@material-ui/core/Typography';

function BraccioPage() {
  const { serial_number } = useParams();

  return <Typography variant="h2">Braccio {serial_number}</Typography>;
}

export default BraccioPage;
