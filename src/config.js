const appEnv = import.meta.env.VITE_APP_ENV;

export const API_BASE_URL =
  appEnv === "local"
    ? import.meta.env.VITE_LOCAL_API
    : import.meta.env.VITE_PROD_API;