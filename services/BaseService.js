export class BaseService {
  constructor() {
  }

  post = (url, data) => {
    const promise = axios({
      url,
      method: "POST",
      data,
    });
    return promise;
  };

  get = (url) => {
    const promise = axios({
      url,
      method: "GET",
    });

    return promise;
  };

  put = (url, data) => {
    const promise = axios({
      url,
      method: "PUT",
      data,
    });
    return promise;
  };

  del = (url) => {
    const promise = axios({
      url,
      method: "DELETE",
    });
    return promise;
  };
}
