type HttpMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'
type AjaxData = {
  [key: string]: any
}

interface AjaxProps {
  method?: HttpMethod
  url?: string
  data?: AjaxData
  query?: object
  success?: (res?: object, status?: number, xhr?: XMLHttpRequest) => void
  fail?: (res?: object, status?: number, xhr?: XMLHttpRequest) => void
  complete?: (res?: object, status?: number, xhr?: XMLHttpRequest) => void
  dataType?: string
}

const ajax = ({
  method,
  url,
  query = {},
  data,
  success,
  fail,
  complete,
  dataType = 'json',
}: AjaxProps): void => {
  const xhr = new XMLHttpRequest()
  const res = []
  for (const key in query) {
    res.push(`${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
  }
  xhr.open(method, url + `?${res.join('&')}`)
  xhr.setRequestHeader('Content-Type', 'application/json')

  xhr.onload = (): void => {
    const { status, responseText } = xhr
    let responseObj: object
    if (dataType === 'json') {
      responseObj = JSON.parse(responseText)
    }
    if (status.toString().startsWith('2')) {
      success(responseObj, status, xhr)
    } else {
      fail(responseObj, status, xhr)
    }
    if (complete) {
      complete(responseObj, status, xhr)
    }
  }

  xhr.send(JSON.stringify(data))
}

export default ajax
