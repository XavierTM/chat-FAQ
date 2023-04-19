

import axios from 'axios';


class AxiosError extends Error {

   toString() {
      return this.message;
   }

   constructor(msg, status) {
      super(msg);
      this.status = status;
   }
}


const request = axios;

window.App.apiUrl = 'http://127.0.0.1:8080';

axios.interceptors.request.use(config => {
   const domain = window.App.apiUrl || '';
   config.url = `${domain}${config.url}`;
   return config;
});



axios.interceptors.response.use(null, err => {

   if (err && err.response) {
      const msg = typeof err.response.data === 'string' ? err.response.data : err.response.statusText;;
      err = new AxiosError(msg, err.response.status);
   }

   throw err;
});

axios.interceptors.response.use(null, err => {

   if (err.status === 401) {
      window.App.redirect('/login');
   }

   throw err;
   
});


export default request;