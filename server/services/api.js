export default class FetchApi {
  static timeout = 6000

  static headers = {
    'Accept': 'application/json, text/javascript; q=0.9, */*; q=0.6',
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/json'
  }

  constructor (props) {
    const {baseUrl, headers, errorHandler} = props
    this.errorHandler = errorHandler
    this.baseUrl = baseUrl
    this.headers = {
      ...FetchApi.headers
    }

    if (headers) {
      Object.keys(headers).forEach((key) => {
        if (headers[key] === null) {
          delete this.headers[key]
        } else {
          this.headers[key] = headers[key]
        }
      })
    }
  }

  request = async (url, options, passThrough = {}) => {
    const {errorHandler} = this

    const response = await fetch(`${url}`, options).catch((err) => {
      if (errorHandler) {
        errorHandler(err)
      } else {
        throw err
      }
    })

    if (response.ok) {
      if (response.status !== 204) {
        const promise = (response.headers.get('content-type') === 'image/jpeg')
          ? response.text()
          : response.json()

        const data = await promise().catch((err) => {
          console.log('data process err', err)
        })

        return (passThrough)
          ? {...passThrough, ...data}
          : data
      }
    } else {
      const apiError = new Error('Response not ok')
      apiError.response = response

      if (errorHandler) {
        errorHandler(apiError)
      } else {
        throw apiError
      }
    }
  }

  get = (url, passThrough, timeout = FetchApi.timeout) => {
    const {headers, request, baseUrl} = this
    const options = {
      timeout,
      headers,
      credentials: 'include',
      method: 'GET',
      mode: 'cors'
    }

    return request(`${baseUrl}/${url}`, options, passThrough)
  }

  post = (url, data, passThrough, timeout = FetchApi.timeout) => {
    const {headers, request, baseUrl} = this
    const options = {
      timeout,
      headers,
      credentials: 'include',
      body: this.headers['Content-Type'] === 'application/json' ? JSON.stringify(data) : data,
      method: 'POST',
      mode: 'cors'
    }

    return request(`${baseUrl}/${url}`, options, passThrough)
  }

  put = (url, data, passThrough, timeout = FetchApi.timeout) => {
    const {headers, request, baseUrl} = this
    const options = {
      timeout,
      headers,
      credentials: 'include',
      body: this.headers['Content-Type'] === 'application/json' ? JSON.stringify(data) : data,
      method: 'PUT',
      mode: 'cors'
    }

    return request(`${baseUrl}/${url}`, options, passThrough)
  }

  delete = (url, passThrough, timeout = FetchApi.timeout) => {
    const {headers, request, baseUrl} = this
    const options = {
      timeout,
      headers,
      credentials: 'include',
      method: 'DELETE',
      mode: 'cors'
    }

    return request(`${baseUrl}/${url}`, options, passThrough)
  }
}
