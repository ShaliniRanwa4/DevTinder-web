
// require("dotenv").config();
// const backendURL = import.meta.env.VITE_BACKEND_URL;
// export const BASE_URL=
// location.hostname==="localhost"?"http://localhost:7777":backendURL

export const BASE_URL = location.hostname === "localhost" 
  ? "http://localhost:7777" 
  : import.meta.env.VITE_BACKEND_URL;