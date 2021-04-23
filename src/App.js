import useSWR from 'swr';

const BASE_URL = 'http://localhost:8000';

const fetcher = (url, ...args) =>
  fetch(BASE_URL + url, ...args).then((res) => res.json());

function App() {
  const { data, error } = useSWR('/braccio/', fetcher);

  if (error) return <p>Error.</p>;
  if (!data) return <p>Loading...</p>;

  return data.map(({ id, name, serial }) => (
    <div key={id}>
      <p>Name: {name}</p>
      <p>Serial: {serial}</p>
    </div>
  ));
}

export default App;
