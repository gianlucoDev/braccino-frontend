import Box from '@material-ui/core/Box';

import Icon from '@material-ui/icons/Description';

import BraccioAppBar from 'components/BraccioAppBar';
import BigMessage from 'components/BigMessage';

function NotFoundPage() {
  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box flexShrink={1}>
        <BraccioAppBar />
      </Box>
      <Box flexGrow={1}>
        {/* FIXME: fix scrollbar */}
        <BigMessage IconComponent={Icon} message="404: Pagina non trovata" />
      </Box>
    </Box>
  );
}

export default NotFoundPage;
