import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";
import { Photo, Profile } from "../models/profile";
import { Revenue, RevenueAddValues } from "../models/revenue";
import { Dairy, DairyFormValues, DairyPhoto, IAddDairyPhoto } from "../models/dairy";
import { PaginatedResult } from "../models/pagination";
import { SaleRegister, SaleRegisterAddValues, SaleListParam } from "../models/saleRegister";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use( config => {
  const token = store.commonStore.token;
  if(token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if(import.meta.env.DEV) await sleep(1000);
    const pagination = response.headers['pagination'];
    if(pagination) {
      response.data = new PaginatedResult(response.data, JSON.parse(pagination));
      return response as AxiosResponse<PaginatedResult<unknown>>
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config, headers } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (config.method == "get" && Object.prototype.hasOwnProperty.call(data.errors, "id")) {
          router.navigate("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        if(status === 401 && headers['www-authenticate']?.startsWith('Bearer error="invalid_token"')) {
          store.userStore.logout();
          toast.error("Session Expired - please login again");  
        } else {
          toast.error("Unauthorized");
        }
        break;
      case 403:
        toast.error("Forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const requests = {
  get: <T>(Url: string) => axios.get<T>(Url).then(responseBody),
  post: <T>(Url: string, body: object) => axios.post<T>(Url, body).then(responseBody),
  put: <T>(Url: string, body: object) => axios.put<T>(Url, body).then(responseBody),
  del: <T>(Url: string) => axios.delete<T>(Url).then(responseBody),
};

const Dairies = {
  list: (params: URLSearchParams) => axios.get<PaginatedResult<Dairy[]>>("/farms", {params}).then(responseBody),
  details: (id: string) => requests.get<Dairy>(`/farms/${id}`),
  create: (dairy: DairyFormValues) => requests.post<Dairy>("/farms", dairy),
  update: (dairy: DairyFormValues) => requests.put<void>(`/farms/${dairy.id}`, dairy),
  // delete: (id: string) => requests.del<void>(`/farms/${id}`),
  uploadPhoto: (photo: IAddDairyPhoto) => {
    const formData = new FormData();
    formData.append('File', photo.file);
    formData.append('Description', photo.description);
    formData.append('Latitude', photo.latitude.toString());
    formData.append('Longitude', photo.longitude.toString());
    return axios.post<DairyPhoto>(`/farms/${photo.dairyId}/photos`, formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    });
  }
};

 const Account = {
  current: () => requests.get<User>('/account'),
  login: (user: UserFormValues) => requests.post<User>('/account/login', user),
  register: (user: UserFormValues) => requests.post<User>('/account/register', user),
  refreshToken: () => requests.post<User>('/account/refreshToken', {})
}

const Profiles = {
  get: (useName: string) => requests.get<Profile>(`/profiles/${useName}`),
  update: (profile: Partial<Profile>) => requests.put<void>('/profiles', profile),
  uploadPhoto: (file: Blob) => {
    const formData = new FormData();
    formData.append('File', file);
    return axios.post<Photo>(`/photos`, formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    });
  },
  setMainPhoto: (id: string) => requests.post<void>(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => requests.del(`/photos/${id}`),  
}

const Revenues = {
  list: (params: URLSearchParams) => axios.get<PaginatedResult<Revenue[]>>("/revenues", {params}).then(responseBody),  
  details: (id: string) => requests.get<Revenue>(`/revenues/${id}`),
  create: (dairy: RevenueAddValues) => requests.post<Revenue>("/revenues", dairy),
  update: (dairy: RevenueAddValues) => requests.put<void>(`/revenues/${dairy.id}`, dairy),
  // delete: (id: string) => requests.del<void>(`/revenues/${id}`),
};

const SaleRegisters = {
  list: (params: SaleListParam) => axios.get<PaginatedResult<SaleRegister[]>>("/sales", {params}).then(responseBody),  
  details: (id: string) => requests.get<SaleRegister>(`/sales/${id}`),
  create: (saleRegister: SaleRegisterAddValues) => requests.post<SaleRegister>("/sales", saleRegister),
  update: (saleRegister: SaleRegisterAddValues) => requests.put<void>(`/sales/${saleRegister.id}`, saleRegister),
  // delete: (id: string) => requests.del<void>(`/sales/${id}`),
};

const agent = {
  Dairies,
  Account,
  Profiles,
  Revenues,
  SaleRegisters
};

export default agent;
