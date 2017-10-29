import { mapState , mapActions } from 'vuex'
import VsLoading from '../components/vsLoading.vue'
export default {
    data() {
        return {
            isFirst:true
        }
    },
    methods: {
        // 登录超时函数
        unauthorized(){
            const self = this;
            localStorage.clear();
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
                        localStorage.clear();
                        self.$router.push('/login');
                    }
                });
            }
        },
        // 全局http请求方法
        onHttp(options, successCallback, errorCallback) {
            const self = this;
            var options = options;
            var successCallback = successCallback;
            var errorCallback = errorCallback;
            if(self.isTimeOut || !Util.isObject(options)){return false;}
            // 默认使用GET请求
            options.method = (options.method ? options.method.toUpperCase() : null) || 'GET';
            // options.fileFlow = ((options.fileFlow === null || options.fileFlow === undefined) ? false : Boolean(options.fileFlow));
            let config = {
                method: options.method,
                url: `${self.url}${options.path}`,
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
                    "x-auth-token": `${self.token}`
                }
            }
            if(options.method === 'GET'){
                config.params = options.params;
            }else if(options.method == 'POST'){
                let params_arr = [];
                for(let key in options.params){
                    params_arr.push(`${key}=${options.params[key]}`);
                }
                config.body = params_arr.join('&');
            }
            
            if(!options.fileFlow){
                self.$http(config).then((response) => {
                    const res = response.body;
                    if(res.code > 0){
                        if(res.token && res.token !== ''){
                            self.saveStorageState({
                                attr:'token',
                                val:res.token
                            });
                        }
                        Util.isFunction(successCallback) ? successCallback(res) : '';
                    }else{
                        self.$nprogress.done();
                        self.setState([
                            {attr:'onLoading',val:false},
                            {attr:'innerLoading',val:false}
                        ]);
                        self.$message({
                            message: `${res.msg}`,
                            type: 'error'
                        });
                    }
                }, (response) => {
                    if(response.status === 401){
                        self.unauthorized();
                    }else{
                        self.$nprogress.done();
                        self.setState([
                            {attr:'onLoading',val:false},
                            {attr:'innerLoading',val:false}
                        ]);
                        if(Util.isFunction(errorCallback)){
                            errorCallback(response)
                        }else{
                            self.$message({
                                message: `请求结果：${response.ok}`,
                                type: 'error'
                            });
                            console.error(`请求地址：${response.url} 请求结果：${response.ok}`, 'error');
                        }
                    }
                });
            }else{
                var xmlhttp = null;  
                try{  
                     //尝试创建 XMLHttpRequest 对象，除 IE 外的浏览器都支持这个方法。  
                    xmlhttp = new XMLHttpRequest();  
                }catch(e){  
                    try{  
                         //使用较新版本的 IE 创建 IE 兼容的对象（Msxml2.XMLHTTP）。  
                         xmlhttp = ActiveXobject("Msxml12.XMLHTTP");  
                    }catch(e1){  
                        try{  
                             //使用较老版本的 IE 创建 IE 兼容的对象（Microsoft.XMLHTTP）。  
                             xmlhttp = ActiveXobject("Microsoft.XMLHTTP");  
                        }catch(e2){  
                             console.error(e2);
                        }   
                    }  
                }
                if(options.method === 'GET'){
                    var s_params = [];
                    if(options.params){
                        for(let key in options.params){
                            s_params.push(`${key}=${options.params[key]}`);
                        }
                    }
                    // 第三个参数 false 代表设置同步请求
                    xmlhttp.open(options.method, `${self.url}${options.path}?${s_params.join('&')}`, false); 
                }else if(options.method === 'POST'){
                    // 第三个参数 false 代表设置同步请求
                    xmlhttp.open(options.method, `${self.url}${options.path}`, false); 
                }
                
                xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
                xmlhttp.setRequestHeader('x-auth-token', `${self.token}`);
                if(options.method === 'GET'){
                    xmlhttp.send(null);
                }else if(options.method === 'POST'){
                    xmlhttp.send(JSON.stringify(options.params));
                }
                if (xmlhttp.status === 200) {
                    var blob = this.response;
                    console.log('blob:',blob)
                    Util.isFunction(successCallback) ? successCallback(blob) : '';
                } else {
                    self.$nprogress.done();
                    self.setState([
                        {attr:'onLoading',val:false},
                        {attr:'innerLoading',val:false}
                    ]);
                    console.error('error code:',xmlhttp.status)
                }
            }
        },
        ...mapActions([
            'setState',
            'saveStorageState',
            'updateOperateAuthority'
        ]),

    },
    computed: {
        // 使用对象展开运算符将 getters 混入 computed 对象中
        ...mapState([
            'url',
            'isTimeOut',
            'username',
            'token',
            'styles',
            'onLoading',
            'innerLoading',
            'user_type',
            'enterprise_type',
            'enterprise_id',
            'nav_menu_type',
            'set_menu_type',
            'operate_authority',
            'enterpriseIdChange',
            'enterpriseId',//列表=》详情时传
            'enterpriseType',//列表=》详情时传
            'enterprise_name',
            'enterpriseName',//列表=》详情时传
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