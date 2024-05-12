import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity, ActivityFormValues } from "../models/activity";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";
import { Photo, Profile } from "../models/profile";
import { Dairy, DairyFormValues, DairyPhoto, IAddDairyPhoto } from "../models/dairy";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use( config => {
  const token = store.commonStore.token;
  if(token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
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
        toast.error("Unauthorized");
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

const Activities = {
  list: () => requests.get<Activity[]>("/activities"),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: ActivityFormValues) => requests.post<void>("/activities", activity),
  update: (activity: ActivityFormValues) => requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/activities/${id}`),
  attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {})  
};

const Dairies = {
  list: () => requests.get<Dairy[]>("/farms"),
  details: (id: string) => requests.get<Dairy>(`/farms/${id}`),
  create: (dairy: DairyFormValues) => requests.post<void>("/farms", dairy),
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
  register: (user: UserFormValues) => requests.post<User>('/account/register', user)
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

const agent = {
  Activities,
  Dairies,
  Account,
  Profiles
};

export default agent;
