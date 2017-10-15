export default {
	methods:{
		// 校验IP及网段
        checkACLInput(){
            const regIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
            const ip = this.ACLInput.split('/').length > 1 ? this.ACLInput.split('/')[0].toString() : this.ACLInput;
            const port = this.ACLInput.split('/').length > 1 ? parseFloat(this.ACLInput.split('/')[1]) : 1;
            if(regIp.test(ip)&&(port%1 === 0)&&port>0&&port<256){
                this.ACLInputTips = '';
            }else{
                this.ACLInput == '' ? this.ACLInputTips = '请输入IP或网段' : this.ACLInputTips = '输入IP或网段的格式有误！';
            }
        }
	}
}