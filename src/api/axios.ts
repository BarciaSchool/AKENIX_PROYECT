import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

// Asegúrate de tener en src/types/axios.d.ts:
// import 'axios';
// declare module 'axios' {
//   export interface AxiosRequestConfig { _retry?: boolean; }
// }

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===== REQUEST INTERCEPTOR =====
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 1. Adjuntar JWT
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }


    return config;
  },
  (error: any) => Promise.reject(error)
);

// ===== RESPONSE INTERCEPTOR =====
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers!['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;
      const refreshToken = localStorage.getItem('refresh_token');

      return api
        .post('api/token/refresh/', { refresh: refreshToken })
        .then(({ data }) => {
          const newToken = data.access as string;
          localStorage.setItem('access_token', newToken);
          api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          processQueue(null, newToken);
          originalRequest.headers!['Authorization'] = `Bearer ${newToken}`;
          return api(originalRequest);
        })
        .catch(err => {
          processQueue(err, null);
          localStorage.clear();
          window.location.href = '/login';
          return Promise.reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    }
    return Promise.reject(error);
  }
);

export default api;
