import { mapState , mapActions } from 'vuex'
import VsLoading from '../components/vsLoading.vue'
export default {
    data() {
        return {
            isFirst:true,
            isRefreshToken:false
        }
    },
    methods: {
        // 登录超时函数
        fnTimeOut(){
            const self = this;
            sessionStorage.clear();
            self.closeSocket();
            self.setState([
                {attr:'onLoading',val:false},
                {attr:'innerLoading',val:false},
                {attr:'isTimeOut',val:true}
            ]);
            if(self.isFirst){
                self.isFirst = false;
                self.$confirm('用户未登录或会话已过期,请重新登录','提示',{
                    confirmButtonText: '确定',
                    closeOnClickModal:false,
                    showCancelButton:false,
                    type: 'warning',
                    callback:function(){
                        self.setState({
                            attr:'isTimeOut',val:false
                        });
                        self.isFirst = true;
                        sessionStorage.clear();
                        self.$router.push('/login');
                    }
                });
            }
        },
        // 全局http请求方法
        onHttp(options, successCallback, errorCallback) {
            const self = this;
            const clientNowTime = Date.parse(new Date())/1000;
            const diffTime = clientNowTime - self.clientSt;
            var options = options;
            var successCallback = successCallback;
            var errorCallback = errorCallback;
            if(self.isTimeOut || !Util.isObject(options) || self.isKickedOut){return}
            if(self.isRefreshToken){
                httpCommon();
            }else{
                if(diffTime >= self.exptime){
                    self.fnTimeOut();
                }else if(diffTime < self.exptime && diffTime >= (self.exptime - 30)){
                    self.isRefreshToken = true;
                    self.refreshToken(httpCommon);
                }else{
                    httpCommon()
                }
            }
            function httpCommon(){
                if(options.params){
                    //是否传入集群uuid，不传入则使用当前集群uuid
                    options.params.clusterid = options.params.clusterid ? parseInt(options.params.clusterid) : parseInt(self.clusterid);
                    options.params.clusteruuid = options.params.clusteruuid ? options.params.clusteruuid : (self.clusteruuid ? self.clusteruuid : '');
                }else{
                    options.params = {
                        clusterid:parseInt(self.clusterid),
                        clusteruuid:self.clusteruuid
                    }
                }
                // 默认使用GET请求
                options.method = (options.method ? options.method.toUpperCase() : null) || 'GET';
                let config = {
                    method: options.method,
                    url: `${self.url}${options.path}`,
                    headers: {
                        "Authorization": `Bearer ${self.token}`
                    }
                    // headers: {
                    //     "Content-Type": "application/x-www-form-urlencoded",
                    //     "UserName": Base64.encode(self.username)
                    // },
                    // credentials: true,
                    // emulateJSON: true
                }
                options.method == 'GET' ? config.params = options.params : (options.method == 'POST' ? config.body = JSON.stringify(options.params) : '');
                self.$http(config).then((response) => {
                    const res = response.data;
                    if(res.ecode == 9150 || res.ecode == 9401 || res.ecode == 9402){
                        self.fnTimeOut();
                    }else{
                        Util.isFunction(successCallback) ? successCallback(res) : '';
                    }
                }, (response) => {
                    if(Util.isFunction(errorCallback)){
                        errorCallback(response)
                    }else{
                        self.$nprogress.done();
                        self.setState([
                            {attr:'onLoading',val:false},
                            {attr:'innerLoading',val:false}
                        ]);
                        self.updateCount(true);
                        if(self.errorCount % 30 == 0){
                            self.$message({
                                message: `请求结果：${response.ok}`,
                                type: 'error'
                            });
                        }
                        console.log(`请求地址：${response.url} 请求结果：${response.ok}`, 'error');
                    }
                });
            }
        },
        // token刷新
        refreshToken(callback){
            const self = this;
            self.onHttp({
                method:'POST',
                path:'/authentication/refreshtoken'
            },(response)=>{
                self.isRefreshToken = false;
                if (response.ecode == 0) {
                    const data = response.data;
                    if (data == null) {return}
                    let tokenJson = JSON.parse(Base64.decode(data.token.split('.')[1]));
                    sessionStorage.setItem('token',data.token);
                    sessionStorage.setItem('exptime',JSON.stringify(tokenJson.exp - tokenJson.iat));
                    sessionStorage.setItem('clientSt',JSON.stringify(Date.parse(new Date())/1000));
                    self.updateCluster();
                    Util.isFunction(callback) ? callback() : ''; 
                } else {
                    self.$message({
                        message: response.message,
                        type: 'error'
                    });
                }
            });
        },
        ...mapActions([
            'setState',
            'updateBaseInfo',
            'updateCluster',
            'updateCount',
            'createSocket',
            'closeSocket'
        ])
    },
    computed: {
        // 使用对象展开运算符将 getters 混入 computed 对象中
        ...mapState([
            'url',
            'exptime',
            'clientSt',
            // 'intervaltime',
            // 'errorCount',
            'isTimeOut',
            'username',
            'token',
            'isroot',
            'styles',
            'onLoading',
            'innerLoading',
            'socket',
            'user_role'
        ])
    },
    destroyed(){
        this.$nprogress.done();
        this.setState([
            {attr:'onLoading',val:false},
            {attr:'innerLoading',val:false}
        ]);
    },
    components:{
        VsLoading
    }
}