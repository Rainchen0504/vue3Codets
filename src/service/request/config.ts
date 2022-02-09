let BASE_URL = 'http://httpbin.org'
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://httpbin.org'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://httpbin.org'
} else {
  BASE_URL = 'http://httpbin.org'
}

export { BASE_URL, TIME_OUT }
