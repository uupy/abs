export default {
	methods:{
		testEmail(s){
            return (rule, value, callback)=>{
                if(!value){
                    return callback(new Error('邮箱不能为空'));
                }else{
                    const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    if(!reg.test(value)){
                        return callback(new Error('请输入正确的邮箱地址'));
                    }else{
                        callback();
                    }
                }
            };
        }
	}
}