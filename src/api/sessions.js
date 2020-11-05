import axios from 'axios';
import qs from 'qs';

export default axios.create({
  baseURL: 'https://staging.ownerapp.ai/manager',
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer: (params) => {
    return qs.stringify(params);
  }
});