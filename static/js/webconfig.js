const VSConfig = {
	dev:true,
	ip:'192.168.14.9',
	port:'10001',
	host:window.location.host,
	isHttps:(window.location.protocol.indexOf('https') !== -1 ? true : false)
}
const VSStatus = {
	volume:{
		UK:'未知',		//unknow
		0:'不可用', 	//DISABLE
		1:'健康',		//HEALTH
		2:'降级',		//DEGRADE
		3:'失效',		//FAILURE
		4:'挂起',		//SUSPEND
		5:'已删除'		//DELETED
	},
	replicas:{
		UK:'未知',		//unknow
		0:'未知', 		//unknow
		1:'可用',		//USABLE
		2:'错误',		//FAULT
		3:'重建中',		//REBUILD
		4:'降级'		//ECDEGRADE
	},
	component:{
		UK:'未知',		//unknow
		0:'未知', 		//unknow
		1:'已连接',		//CONNECTED
		2:'失去连接',	//DISCONNECTED
		3:'过期'		//EXPIRE
	}
}
const VSFlag = {
	volume:{
		UK:'未知',		//unknow
		0:'正常', 		//NORMAL_FLAG
		1:'克隆中',		//CLONING_FLAG
		2:'重建中',		//REBUIDING_FLAG
		3:'迁移中',		//MIGRATING_FLAG
		4:'扩容中',		//
		5:'备份中',		//
		6:'恢复中',		//
		7:'恢复错误'	//
	}
}
const VSNames = {
	DevType:{
		UK:'未知',
		block:'SCSI块设备', 
		target:'iSCSI Target', 
		share:'共享设备'
	},
	DataType:{
		UK:'未知',
		linear:'线性', 
		stripe:'条带', 
		ec:'纠删码'
	},
	DriveType:{
		UK:'未知',
		HDD:'机械硬盘', 
		SSD:'固态硬盘'
	},
	Safety:{
		UK:'未知',
		first:'一般', 
		second:'高',
		third:'最高'
	}
}