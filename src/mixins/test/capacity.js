export default {
	methods:{
		testCapacity(s){
            let checkCapacity = (rule, value, callback)=>{
                if(!value){
                    return callback(new Error('容量不能为空'));
                }else{
                    if(!isNaN(value)){
                        if((value < 128 && this.addForm.unit == 'M') || ((value < 128/1024 && this.addForm.unit == 'G'))){
                            return callback(new Error('容量不能低于128M'));
                        }else if((value > 1024*10 && this.addForm.unit == 'G')||(value > 1024*1024*10 && this.addForm.unit == 'M')){
                            return callback(new Error('容量不能高于10TB'));
                        }
                        callback();
                    }else{
                        return callback(new Error('请输入数字'));
                    }
                }
            };
            return checkCapacity
        }
	}
}