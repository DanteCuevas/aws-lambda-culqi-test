import axios from "axios";
 
window.axios = axios;
 
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.headers.common["Authorization"] = "Bearer pk_test_LsRBKejzCOEEWOsw";
window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = "http://localhost:3001";