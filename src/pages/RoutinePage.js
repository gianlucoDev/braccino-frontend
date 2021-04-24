import { useParams } from 'react-router-dom';

function RoutinePage() {
  const { id } = useParams();
  return <h1>Routine ID: {id}</h1>;
}

export default RoutinePage;
