import { createStore } from "vuex";
import router from '../router'
import { ElMessage } from 'element-plus'
import { HttpLogout } from '../public/http'
export default createStore({
  state: {
	userInfoX: null as any
  },
  getters: {},
  mutations: {
	
	userInfoMain(state,res){
		console.log(res)
		state.userInfoX = JSON.parse(res)
		localStorage.setItem("userInfoX",res)
	},
	logoutMain(state,res){
		
		if(res){
			HttpLogout().then((res:any)=>{
				ElMessage({
				    message: res.message,
				    type: 'warning',
				})
				router.push('/login')
			})
		}else{
			
			router.push('/login')
		}
		state.userInfoX.token = null
		localStorage.setItem("userInfoX",JSON.stringify(state.userInfoX))
	}
	  
  },
  actions: {},
  modules: {},
});
