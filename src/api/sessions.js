import axios from 'axios';


export default axios.create({
  baseURL: 'https://staging.ownerapp.ai/manager'
});