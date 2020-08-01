import axios from "axios";

//Configuração do axios
const api = axios.create(
  {
    baseURL: "https://rocketseat-node.herokuapp.com/api"
  });

export default api;