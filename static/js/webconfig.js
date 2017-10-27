var WEBConfig = {
	name:'高银保理金信系统'
}

var ABS_ROLE = {
	user:{
		1:'管理员',
		2:'企业法人',
		3:'代理人1',
		4:'代理人2',
		5:'对接人'
	},
	enterprise:{
		1:'集团公司',
		2:'企业法人',
		3:'代理人1',
		4:'代理人2',
		5:'对接人'
	},
	audit: {
		1: '经办',
		2: '复核'
	}
}

var ABS_TYPE = {
	enterprise:{
		1:'保理商',
		2:'集团公司',
		3:'融资客户',
		4:'项目公司',
		5:'合作方',
		6:'合作方',
	}
}

var ABS_STATUS = {
	protocolStatus:{
		1:'已签约',
		2:'签约中',
		3:'未签约'
	},
	propertyStatus:{
		1:'未融资',
		2:'待审核',
		3:'待分配',
		4:'待发行',
		5:'待放款',
		6:'已匹配',
		7:'已还款',
		8:'已结算',
	},
	enterpriseStatus:{
		1:'未认证',
		2:'已认证',
		3:'未知'
	},
	enterprise:{
		1:'创建中',
		2:'已认证'
	},
	enterpriseMemberStatus:{
		1:'未认证',
		2:'已认证',
		3:'其他'
	},
	backMoney:{
		1:'未匹配',
		2:'已匹配'
	},
	overdue:{
		1:'已逾期',
		2:'已结清'
	}
}

window.WEBConfig = WEBConfig;
window.ABS_ROLE = ABS_ROLE;
window.ABS_TYPE = ABS_TYPE;
window.ABS_STATUS = ABS_STATUS;
