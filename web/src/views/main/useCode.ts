import {HttpVerificationCode} from '../../public/http'
import { ElMessage} from 'element-plus'
export const useCode = (email:string,callback:any) => {
	// 发送验证码
	if(!email){
		ElMessage({
		    message: '请输入邮箱!',
		    type: 'warning',
		})
		return;
	}
	const sendCode = (email:string)=>{
		HttpVerificationCode({
			email:email
		}).then((res:any)=>{
			console.log(res)
			if(res.code === 200){
				ElMessage({
				    message: '发送成功!',
				    type: 'success',
				})
				return;
			}
			ElMessage({
			    message: res.message,
			    type: 'warning',
			})
		})
	}
	sendCode(email)
	let count = 10 as any
	const timeOut = setInterval(()=>{
		if(count > 0){
			count--
		}else{
			clearInterval(timeOut)
			count = "发送验证码"
		}
		console.log(typeof(count))
		if(count === "发送验证码"){
			callback(count)
		}else{
			callback(`剩余${count}s`)
		}
	},1000)
}