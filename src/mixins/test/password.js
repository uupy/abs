export default {
    methods:{
        testPassword(s){
            let checkPassword = (rule, value, callback)=>{
                if(!value){
                    return callback(new Error(`${s}不能为空`));
                }else{
                    if(value.indexOf(' ') !== -1){
                        return callback(new Error(`${s}不能包含空格`));
                    }else{
                        if(value.length<3||value.length>32){
                            return callback(new Error(`${s}由3~32位字符组成`));
                        }else{
                            callback();
                        }
                    }
                }
            };
            return checkPassword
        }
    }
}