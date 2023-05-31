import axios from 'axios';

const Api = axios.create({
  // baseURL: 'https://demo3277827.mockable.io',
  baseURL:'http://localhost:3000'
});
export default Api;
