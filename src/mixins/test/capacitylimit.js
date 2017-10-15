export default {
	methods:{
		testCapacityLimit(s){
            let checkCapacityLimit = (rule, value, callback)=>{
                if(!value){
                    return callback(new Error('容量不能为空'));
                }else{
                    if(!isNaN(value)){
                        if(this.formExpasion.unit == 'M'){
                            if(parseFloat(this.formExpasion.expasionCapacity) < parseFloat(value/1024)){
                                return callback(new Error('输入值超出可扩容范围'));
                            }else if(parseFloat(this.formExpasion.nowCapacity) > parseFloat(value/1024)){
                                return callback(new Error('输入值小于当前容量'));
                            }else{
                                callback();
                            }
                        }else if(this.formExpasion.unit == 'G'){
                            if(parseFloat(this.formExpasion.expasionCapacity) < parseFloat(value)){
                                return callback(new Error('输入值超出可扩容范围'));
                            }else if(parseFloat(this.formExpasion.nowCapacity) >= parseFloat(value)){
                                return callback(new Error('输入值小于或等于当前容量'));
                            }else{
                                callback();
                            }
                        }
                        
                    }else{
                        return callback(new Error('请输入数字'));
                    }
                }
            };
            return checkCapacityLimit
        }
	}
}