export default {
	methods:{
		testBasic(s){
            let checkBasic = (rule, value, callback)=>{
                if (!value) {
                    return callback(new Error(`${s}不能为空`));
                } else {
                    const re = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-\_]/g;
                    if (!re.test(value)) {
                        const regex = new RegExp("[\\u4E00-\\u9FFF]+","g"); 
                        if(regex.test(value)){
                            return callback(new Error(`${s}不能含有中文`));
                        }else{
                            if(value.length < 3 || value.length > 32){
                                return callback(new Error(`${s}由3~32位字符组成`));
                            }else{
                                callback();
                            }
                        }
                    } else {
                        return callback(new Error(`${s}不能含特殊字符`));
                    }
                }
            };
            return checkBasic
        }
	}
}