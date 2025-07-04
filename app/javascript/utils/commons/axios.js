import axios from 'axios';

const csrfToken = document
  .querySelector('meta[name=csrf-token]')
  ?.getAttribute('content');
axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;

export default axios;
