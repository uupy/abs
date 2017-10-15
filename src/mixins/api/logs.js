export default {
    data(){
        return{
            isAlarmPager:true,
            alarms: [],
            alarmstotal: 0,
            alarmspagenum: 0,
            alarmspagesize: 10,
            alarmsdatePicker:'',
            alarmspickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, 
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ],
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            isLogsPager:true,
            logs: [],
            logstotal: 0,
            logspagenum: 0,
            logspagesize: 10,
            logsdatePicker:'',
            logspickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }],
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            }
        }
    },
    methods: {
        //获取告警列表
        getAlarmsList() {
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
        },
        //获取操作日志列表
        getLogsList() {
            const self = this;
            let params = {
                    pagenum:self.logspagenum,
                    pagesize:self.logspagesize,
                    username:self.username
                };
            self.filters.name !== '' ? (params.filtername = self.filters.name) :'';
            self.filters.startdatetime !== 0 ? (params.filterstartdatetime = self.filters.startdatetime) :'';
            self.filters.enddatetime !== 0 ? (params.filterenddatetime = self.filters.enddatetime) :'';
           
            self.$nprogress.start();
            self.setState({
                attr:'onLoading',
                val:true
            });
            self.onHttp({
                method:'GET',
                path:'/user/operatelogs',
                params:params
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });
                self.logs = [];
                self.logstotal = 0;
                if(response.ecode == 0){
                    const data = response.data;
                    if(data == '' || data == null){ return }
                    if(data.List == null){ return }
                    data.List.forEach((item,idx)=>{
                        item.clonename = item.operatername.replace(self.filters.name,'<i class="filters-string">'+self.filters.name+'</i>');
                        item.index = idx+1+self.logspagenum*self.logspagesize;
                        item.operatetime = new Date(item.operatetime*1000).Format("yyyy-MM-dd hh:mm:ss");
                        item.status = item.ecode == 0 ? '成功' : '失败';
                    });
                    self.logs = data.List;
                    self.logstotal = data.TotalCount;
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