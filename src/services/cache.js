import axios from 'axios';


const api = axios.create({
  baseURL: process.env.PUBLIC_URL+'/cache/',
});

const cache = (route, params) => (
  api.get(route, {
    params: params.params,
  }).then((res) => {
    let data = res.data;
    params.dispatch({type: params.type, data: data})
  }).catch(function (error) {
    alert(error);
  })
);

export default cache;