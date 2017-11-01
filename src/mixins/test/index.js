export default {
    methods:{
        testPassword(s){
            return (rule, value, callback)=>{
                if(!value){
                    return callback(new Error(`${s}不能为空`));
                }else{
                    const regex = /^(?=.*?[A-Za-z]+)(?=.*?[0-9]+)(?=.*?[A-Z]).*$/;
                    if(!regex.test(value)){
                        return callback(new Error(`${s}由大小写字母及数字组成！`));
                    }else{
                        callback();
                    }
                }
            };
        },
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
        },
        testMobile(s){
            return (rule, value, callback)=>{
                if(!value){
                    return callback(new Error('手机号码不能为空'));
                }else{
                    const reg = /^1[3|4|5|7|8][0-9]{9}$/;
                    if(!reg.test(value)){
                        return callback(new Error('手机号码格式不正确'));
                    }else{
                        callback();
                    }
                }
            };
        }
    }
}