const BASE_URL = 'http://localhost:8000';

const fetcher = (url) => fetch(BASE_URL + url).then((res) => res.json());

export default fetcher;
