export default {
    data(){
        return{}
    },
    methods: {
        
        //待中登网登记列表
        factorMayDengJiAssetsList(options){
            const self = this;
            self.$nprogress.start();

            self.setState({
                attr:'onLoading',
                val:true
            });

            let params = {
                curPage:self.currentPage,
                pageSize:self.pageSize
            }

            if(options){
                
                if(options.receiveableMoneyBeginTime){
                    params.receiveableMoneyBeginTime = options.receiveableMoneyBeginTime
                }

                if(options.receiveableMoneyEndTime){
                    params.receiveableMoneyEndTime = options.receiveableMoneyEndTime
                }

                if(options.submitBeginTime){
                    params.submitBeginTime = options.submitBeginTime
                }
                if(options.submitEndTime){
                    params.submitEndTime = options.submitEndTime
                }
                
                if(options.keyword){
                    params.keyword = options.keyword
                }
            }
                
            self.onHttp({
                method:'GET',
                path:'/assets/factorMayDengJiAssetsList',
                params:params
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });
                if(response.code > 0){
                    const data = response.data;
                    if(data){
                        if(Util.isArray(data.list)){
                            self.list = data.list;
                            self.pageTotal = data.total;
                            self.pages = data.pages;
                        }
                    }           
                }else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        },
        //中登网登记 => 保理商
        factorUploadRegistrationInfo(options){
            const self = this;
            self.$nprogress.start();

            self.setState({
                attr:'onLoading',
                val:true
            });
            self.onHttp({
                method:'POST',
                path:'/assets/factorUploadRegistrationInfo',
                params:options
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });
                if(response.code > 0){
                    const data = response.data;
                    self.$message.success('已登记');
                    self.factorMayDengJiAssetsList(self.params);     
                }else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        },
    }
}