import axios from "axios";
class ApiService {

  get(url: string) {
    const headers = { "Content-Type": "application/json" };
    return axios(url, { headers, method: "get" })
      .then(async (response) => {
        return response.data;
      })
      .catch((e) => {
        throw e;
      });
  }
  put(url: string, data: any) {
    const headers = { "Content-Type": "application/json" };
    return axios(url, { headers, method: "put", data })
      .then(async (response) => {
        return response.data;
      })
      .catch((e) => {
        throw e;
      });
  }
  delete(url: string) {
    const headers = { "Content-Type": "application/json" };
    return axios(url, { headers, method: "delete" })
      .then(async (response) => {
        return response.data;
      })
      .catch((e) => {
        throw e;
      });
  }
  post(url: string, data: any) {
    const headers = { "Content-Type": "application/json" };
    return axios(url, { headers, method: "post", data })
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  }
}

export default () => new ApiService();
