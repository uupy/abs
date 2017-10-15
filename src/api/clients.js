export default {
    data(){
        return{
            
        }
    },
    methods: {
        //获取告警列表
        getClients() {
            const self = this;
            let params = {
                    pagenum:self.alarmspagenum,
                    pagesize:self.alarmspagesize,
                    flag:self.filters.alarmsflag
                };
            self.filters.name !== '' ? (params.filtername = self.filters.name) :'';
            self.filters.startdatetime !== 0 ? (params.filterstartdatetime = self.filters.startdatetime) :'';
            self.filters.enddatetime !== 0 ? (params.filterenddatetime = self.filters.enddatetime) :'';
            self.filters.alarmslevel !== 0 ? (params.alarmslevel = self.filters.alarmslevel) :'';
            if(self.filters.startdatetime !== 0 && self.filters.enddatetime !== 0){
                params.flag = false
            }
            self.$nprogress.start();
            self.setState({
                attr:'onLoading',
                val:true
            });
            self.onHttp({
                method:'GET',
                path:'/alarm/list',
                params:params
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });
                self.alarms = [];
                self.alarmstotal = 0;
                if(response.ecode == 0){
                    const data = response.data;
                    if(data == '' || data == null){ return }
                    if(data.list == null){ return }
                    data.list.forEach((item,idx)=>{
                        item.cloneName = item.Name.replace(self.filters.name,'<i class="filters-string">'+self.filters.name+'</i>');
                        item.index = idx+1+self.alarmspagenum*self.alarmspagesize;
                        item.CTime = new Date(item.CTime*1000).Format("yyyy-MM-dd hh:mm:ss");
                        item.LevelTxt = item.Level == 4 ? '紧急' : (item.Level == 3 ? '重要' : (item.Level == 2 ? '次要' : (item.Level == 1 ? '提示' : '未知')));
                        item.TypeTxt = item.Type == 1 ? '故障' : (item.Type == 2 ? '事件' : '未知');
                        item.ModuleTxt = item.Module == 1 ? '设备模块' : (item.Module == 2 ? '系统模块' : (item.Module == 3 ? '服务模块' : '未知'));
                        item.SubModuleTxt = item.SubModule == 4 ? 'CPU' : (item.SubModule == 5 ? '负载' : (item.SubModule == 6 ? '内存' : (item.SubModule == 7 ? '网络' : (item.SubModule == 8 ? '磁盘' : (item.SubModule == 9 ? '主机' : (item.SubModule == 10 ? '存储' : (item.SubModule == 11 ? '应用' : (item.SubModule == 12 ? '策略' : '未知'))))))));
                    });
                    self.alarms = data.list;
                    self.alarmstotal = data.totalcount;
                } else{
                    self.$message({
                        message: response.message,
                        type: 'error'
                    });
                }
            });
        }
    }
}