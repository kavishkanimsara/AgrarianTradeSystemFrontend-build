import axios from 'axios';
const axiosInstance = axios.create({
  baseURL:'https://agrariantradesystemapi.azurewebsites.net/api',
});

export default axiosInstance;