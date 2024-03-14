import axios from "axios";
const VITE_SOME_KEY = import.meta.env.VITE_SOME_KEY;
const myAxios = axios.create({
  baseURL: VITE_SOME_KEY,
});
export default myAxios;
