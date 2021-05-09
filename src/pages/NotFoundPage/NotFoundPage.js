import Icon from '@material-ui/icons/Description';

import BigMessage from '../../components/BigMessage';

function NotFoundPage() {
  return <BigMessage IconComponent={Icon} message="404: Pagina non trovata" />;
}

export default NotFoundPage;
