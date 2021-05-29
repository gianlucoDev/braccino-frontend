import { BASE_URL } from './urls';

const fetcher = (url) => fetch(BASE_URL + url).then((res) => res.json());

export default fetcher;
