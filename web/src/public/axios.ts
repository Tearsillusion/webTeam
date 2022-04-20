import axios from "axios";
import qs from "qs";
import { ElMessage, ElLoading } from 'element-plus'
import { getCurrentInstance } from 'vue'
import store from '../store'



axios.defaults.baseURL = 'api/'  
//post请求头
axios.defaults.headers.post["Content-Type"] ="application/x-www-form-urlencoded;charset=UTF-8";
//设置超时
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
	  if(response.data.code === 401){
		  ElMessage.error(response.data.message)
		  store.commit('logoutMain',false)
		  return;
	  }
	  console.log(response)
	  return response.data
  },
  error => {
	
  	if (error && error.response) {
  		error.message = ""
  	  // 1.公共错误处理
  	  // 2.根据响应码具体处理
	  
  	  switch (error.response.status) {
  	    case 400:
  	      error.message = "错误请求";
  	      break;
  	    case 401:
  	      error.message = "未授权，请重新登录";
		  store.commit('logoutMain',false)
  	      break;
  	    case 403:
  	      error.message = "拒绝访问";
  	      break;
  	    case 404:
  	      error.message = "请求错误,未找到该资源";
  	      break;
  	    case 405:
  	      error.message = "请求方法未允许";
  	      break;
  	    case 408:
  	      error.message = "请求超时";
  	      break;
  	    case 500:
  	      error.message = "服务器端出错";
  	      break;
  	    case 501:
  	      error.message = "网络未实现";
  	      break;
  	    case 502:
  	      error.message = "网络错误";
  	      break;
  	    case 503:
  	      error.message = "服务不可用";
  	      break;
  	    case 504:
  	      error.message = "网络超时";
  	      break;
  	    case 505:
  	      error.message = "http版本不支持该请求";
  	      break;
  	    default:
  	      error.message = `连接错误${error.response.status}`;
  	  }
  	} else {
  	  // 超时处理
  	  if (JSON.stringify(error).includes("timeout")) {
		   ElMessage.error('服务器响应超时，请刷新当前页')
  	  }
  	  error.message = "连接服务器失败";
  	}
  	ElMessage.error(error.message)
	return Promise.reject(error);
  }
)
type HTTPTYPE = {
 POST:any,
 GET:any,
}
let HTTP: HTTPTYPE = {
	POST:null,
	GET:null,
}
 HTTP.POST = (url: string, data: any,files:any) => {
	 console.log(!files?qs.stringify(data,{ indices: false }):data)
    return new Promise((resolve, reject) => {
      axios({
          method: 'post',
          url,
		  headers:{
			Authorization:store.state.userInfoX&&store.state.userInfoX.token
		  },
          data: !files?qs.stringify(data,{ indices: false }):data,
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        });
    })
  },

 HTTP.GET = (url: string, data: any) => {
    return new Promise((resolve, reject) => {
      axios({
          method: 'get',
          url,
		  headers:{
		  	Authorization:store.state.userInfoX&&store.state.userInfoX.token
		  },
          params: data,
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

export default HTTP
	 
