import axios from 'axios'

//Promise本身是可以有类型的
// new Promise<string>((resolve) => {
//   resolve('zhan')
// }).then((res) => {
//   console.log(res)
// })

//get请求并传入参数
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'cehnge',
//       age: 24
//     }
//   })
//   .then((res) => {
//     console.log('get', res)
//   })

// //post请求并传入参数
// axios
//   .post('http://httpbin.org/post', {
//     params: {
//       height: 1.8,
//       hobby: 'football'
//     }
//   })
//   .then((res) => {
//     console.log('post', res)
//   })

//axios的配置项
//默认请求地址
axios.defaults.baseURL = 'http://httpbin.org'
// //默认请求超时时间为10s
axios.defaults.timeout = 10000

// axios
//   .get('/get', {
//     params: {
//       name: 'cehnge',
//       age: 24
//     },
//     timeout: 5000
//   })
//   .then((res) => {
//     console.log('get', res)
//   })

// //post请求并传入参数
// axios
//   .post('/post', {
//     params: {
//       height: 1.8,
//       hobby: 'football'
//     }
//   })
//   .then((res) => {
//     console.log('post', res)
//   })

//axios.all
axios
  .all([
    axios.get('/get', { params: { name: 'zhang', age: 24 } }),
    axios.post('/post', { height: 1.8, hobby: 'football' })
  ])
  .then((res) => {
    console.log(res)
  })

//axios拦截器
axios.interceptors.request.use(
  (config) => {
    console.log('请求成功的拦截')
    return config
  },
  (err) => {
    console.log('请求失败的拦截')
    return err
  }
)
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res
  },
  (err) => {
    console.log('响应失败的拦截')
    return err
  }
)
