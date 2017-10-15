export default {
	methods:{
		testHostport(s){
            let checkPort = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error(`${s}不能为空`));
                } else {
                    var re = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
                    if (re.test(value)) {
                        callback();
                    } else {
                        return callback(new Error(`${s}格式不正确`));
                    }
                }
            };
            return checkPort
        }
	}
}