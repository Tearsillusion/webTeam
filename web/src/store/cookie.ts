import store from './index'


store.state.userInfoX = JSON.parse(localStorage.getItem("userInfoX") as any) 
console.log(store.state)