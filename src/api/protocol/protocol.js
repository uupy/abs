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

            let params = {
                curPage:self.currentPage,
                pageSize:self.pageSize,
            }
            if(options){
                if(options.status){
                    params.status = options.status
                }
                if(options.keyword){
                    params.keyword = options.keyword
                }
                if(options.begin){
                    params.begin = options.begin
                }
                if(options.end){
                    params.end = options.end
                }

            }
            self.onHttp({
                method:'GET',
                path:'/protocol/list',
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
                            data.list.forEach((item,index)=>{
                                let date = new Date(item.signTime);                                
                                item.signTime = date.Format('yyyy-MM-dd hh:mm:ss');                                
                            });
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

            let url = '';
            switch(options.enterprise_type){
                case 1:
                    url = '/protocol/factorSignAssets';
                    break;
                case 2:
                case 4:
                    url = '/protocol/productAndCoreSign';
                    break;
                case 3:
                    url = '/protocol/providerSignProtocol';
                    break;                
            }
                
            self.onHttp({
                method:'POST',
                path:url,
                params:{protocolId:options.protocolId}
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });
                if(response.code > 0){
                    const data = response.data;
                    self.$message.success('签约成功');
                    self.getProtocolList({status:1});
                }else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        },

        //签约
        signProtocol(options){
            const self = this;
            self.$nprogress.start();

            self.setState({
                attr:'onLoading',
                val:true
            });

            let url = '/protocol/signProtocol';
                
            self.onHttp({
                method:'POST',
                path:url,
                params:{protocolId:options.protocolId}
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });
                if(response.code > 0){
                    const data = response.data;
                    self.$message.success('签约成功');
                    self.getProtocolList({status:1});
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