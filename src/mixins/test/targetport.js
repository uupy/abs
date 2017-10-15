export default {
	methods:{
		// 校验targetport
        checktargetPort(){
            const self = this;
            let value = self.targetPort;
            if(!value){
                self.targetPortTips = '端口不能为空';
            }else{
                if(!isNaN(value)){
                    if(value < 3260 || value > 32768){
                        self.targetPortTips = '端口范围为3260~32767';
                    }else{
                        self.targetPortTips = '';
                    }
                }else{
                    self.targetPortTips = '请输入数字';
                }
            }
        }
	}
}