export default {
    data(){
        return{}
    },
    methods: {
        getProtocolList(options){
            const self = this;
            self.$nprogress.start();
            self.setState({
                attr:'onLoading',
                val:true
            });

            self.onHttp({
                method:'GET',
                path:'/protocol/list',
                params:{
                    curPage:self.currentPage,
                    pageSize:self.pageSize,
                    status:options.status?options.status:'',
                    keyword:options.keyword?options.keyword:'',
                    begin:options.begin?options.begin:'',
                    end:options.end?options.end:'',
                }
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
                            // data.list.forEach((item,index)=>{
                            //     item.index = (self.currentPage - 1)*self.pageSize + index + 1;
                            // });
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
        
        //未完
        getProtocolDetail(options){
            const self = this;
            self.$nprogress.start();

            self.setState({
                attr:'onLoading',
                val:true
            });
            self.onHttp({
                method:'GET',
                path:'/protocol/list',
                params:{
                    curPage:self.currentPage,
                    pageSize:self.pageNum
                }
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });

                if(response.code > 0){
                    self.list = response.list;
                }else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        },

        //供应商复核（签约）
        checkAssets(options){
            const self = this;
            self.$nprogress.start();

            self.setState({
                attr:'onLoading',
                val:true
            });

            let params = {                
            }           

            if(options){
                if(options.protocolId){
                    params.protocolId = options.protocolId
                }
            } 
                
            self.onHttp({
                method:'POST',
                path:'/protocol/providerCheckAssets',
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
                            // self.propertyList = data.list;
                            // self.pageTotal = data.total;
                            // self.pages = data.pages;
                        }
                    }           
                }else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        }
    }
}