var nodemailer = require("nodemailer")

const verification = (req,res,redisClient)=>{
	res.status(200)
	//email 邮箱
	const reg = /^\w+@\w+\.\w+$/i;
	if (!req.body.email) {
		res.json({
			code: 400,
			message: "请输入邮箱",
		})
	} else if (!req.body.email.match(reg)) {
		res.json({
			code: 400,
			message: "邮箱格式不正确",
		})
	} else {
		const transport = nodemailer.createTransport({
			host: "smtp.qq.com",
			secureConnection: true,
			port: 465,
			auth: {
				user: "1585345738@qq.com",
				pass: "tglvnkpceqzxifhc"
			}
		})
		code = ""
		for (let i = 0; i < 5; i++) {
			code += Math.ceil(Math.random() * 9);
		}
		redisClient.setValue(req.body.email, code)
		const mailOptions = {
			from: "WEB技术研讨群 <1585345738@qq.com>",
			to: req.body.email,
			subject: "来自WEB技术研讨群",
			html: `<div style="color:#333;font-size:15px">【WEB技术研讨群】感谢您的注册，您的验证码为<strong style="color:blue;font-size:25px"> ${code} </strong>请勿泄露于他人<div>`,
		}
	
		transport.sendMail(mailOptions, function(err, response) {
			if (err) {
				console.log(err)
				res.json({
					code: 400,
					message: "信息发送失败",
					err: err
				})
			} else {
				res.json({
					code: 200,
					message: "验证码发送成功",
				})
			}
	
		})
	}
}
module.exports = verification

