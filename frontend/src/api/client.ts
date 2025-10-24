import axios from "axios";

const FALLBACK_BASE_URL = "http://localhost:8000/api";

const resolveBaseUrl = () => {
  const raw =
    import.meta.env.VITE_API_URL ?? (import.meta.env.BACKEN_URL as string | undefined);

  if (!raw) {
    return FALLBACK_BASE_URL;
  }

  try {
    const hasProtocol = /^https?:\/\//i.test(raw);
    const url = new URL(hasProtocol ? raw : `http://${raw}`);

    if (url.pathname === "/" || url.pathname === "") {
      url.pathname = "/api";
    }

    return url.toString().replace(/\/$/, "");
  } catch (error) {
    console.warn("Invalid API URL provided. Falling back to default.", error);
    return FALLBACK_BASE_URL;
  }
};

const api = axios.create({
  baseURL: resolveBaseUrl(),
});

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export default api;
