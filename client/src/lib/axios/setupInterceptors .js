export const setupInterceptors = (store, axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = store.getState().user.accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },

    (error) => Promise.reject(error),
  );
};
