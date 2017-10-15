export default {
	methods:{
		testAddress(s){
            let checkAddress = (rule, value, callback)=>{
                if (!value) {
                    return callback(new Error(`${s}不能为空`));
                } else {
                    const re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                    if (re.test(value)) {
                        callback();
                    } else {
                        return callback(new Error(`${s}格式不正确`));
                    }
                }
            };
            return checkAddress
        }
	}
}