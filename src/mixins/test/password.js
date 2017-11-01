export default {
    methods:{
        testPassword(s){
            let regex = ^(\d(?!\d*$)|[A-z])[A-z0-9]*$;
            return (rule, value, callback)=>{
                if(!value){
                    return callback(new Error(`${s}不能为空`));
                }else{
                    if(!regex.test(value)){
                        return callback(new Error(`${s}由大小写字母及数字组成！`));
                    }else{
                        callback();
                    }
                }
            };
        }
    }
}