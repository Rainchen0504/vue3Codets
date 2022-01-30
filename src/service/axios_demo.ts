import axios from 'axios'

//Promise本身是可以有类型的
// new Promise<string>((resolve) => {
//   resolve('zhan')
// }).then((res) => {
//   console.log(res)
// })

//get请求并传入参数
axios
  .get('http://httpbin.org/get', {
    params: {
      name: 'cehnge',
      age: 24
    }
  })
  .then((res) => {
    console.log('get', res)
  })

//post请求并传入参数
axios
  .post('http://httpbin.org/post', {
    params: {
      height: 1.8,
      hobby: 'football'
    }
  })
  .then((res) => {
    console.log('post', res)
  })
