import Cookie from "js-cookie";
import axios from "axios";

const createInstance = () => {
  let instance = axios.create();

  instance.interceptors.request.use((config) => {
    const token = Cookie.get("VIRTUPAY_USER_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return instance;
};

export default createInstance;

export const instance = createInstance();
