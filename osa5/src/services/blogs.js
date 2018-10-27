import axios from 'axios'
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = ({title, author, url, likes}) => {
    const request = axios.post(baseUrl, {title, author, url, likes}, getConfig());
    return request.then(response => response.data);
};

const getConfig = () => {
   return {
        headers: { 'Authorization': token }
    };
};

export default { getAll, create, setToken }