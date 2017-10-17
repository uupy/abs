const VSConfig = {
	dev:true,
	ip:'192.168.14.9',
	port:'10001',
	host:window.location.host,
	isHttps:(window.location.protocol.indexOf('https') !== -1 ? true : false)
}
const WEBSTATUS = {

}
const WEBNAME = {
	user_role:{
		1:'核心企业',
		2:'项目公司',
		3:'供应商',
		4:'保理商',
		5:'资金方',
	}
}

const STATUS = {
	protocolStatus:{
		1:'已签约',
		2:'签约中',
		3:'未签约'
	},
	propertyStatus:{
		1:'未融资',
		2:'已融资',
		3:'未知'
	}
}