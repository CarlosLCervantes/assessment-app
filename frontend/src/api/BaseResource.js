import axios from 'axios'

const API = 'http://localhost:5000'

class BaseResource {
  constructor() {
    this.baseURL = API
    this.headers = {
      mode: 'no-cors',
    }
  }

  _request(url, method, headers, body, params) {
    const options = {
      url,
      method,
      headers,
      data: body,
      params,
    };

    return axios(options)
      .then(response => Promise.resolve(response.data))
  }

  post(url, body) {
    return this._request(url, 'POST', this.headers, body)
  }

  put(url, body) {
    return this._request(url, 'PUT', this.headers, body)
  }

  fetch(url, params = {}) {
    return this._request(url, 'GET', this.headers, null, params)
  }
}

export default BaseResource
