import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex);
// 应用的数据源
const state = {
    //定义一些组件间通信的变量
    url: VSConfig.dev ? `http://${VSConfig.ip}:${VSConfig.port}/v1` :'/v1',
    wsurl: VSConfig.dev ? `ws://${VSConfig.ip}:${VSConfig.port}/v1/user/connection` : (VSConfig.isHttps ? `wss://${VSConfig.host}/v1/user/connection` : `ws://${VSConfig.host}/v1/user/connection`),
    innerLoading: false,
    onLoading: false,
    isTimeOut: false,
    isKickedOut:false,
    // inactivated:(sessionStorage.getItem('inactivated') == undefined ? false : JSON.parse(sessionStorage.getItem('inactivated'))),
    username: localStorage.getItem('username') || '',
    token: sessionStorage.getItem('token'),
    // isroot: (parseInt(sessionStorage.getItem('isRoot')) == 1 ? true : false),
    exptime:parseInt(sessionStorage.getItem('exptime')),
    clientSt:parseInt(sessionStorage.getItem('clientSt')),
    errorCount:0,
    socket:null,
    styles:'min-height:'+(window.innerHeight-84)+'px',
    // volumename:sessionStorage.getItem('volumename') || '',
    // poolname:sessionStorage.getItem('poolname') || '',
    // strategyname:sessionStorage.getItem('strategyname') || '',
    // namespace:sessionStorage.getItem('namespace') || ''

    //用户角色 1>核心企业 2>项目公司 3>供应商 4>保理商 5>资金方
    user_role:parseInt(localStorage.getItem('user_role'))
}
// 定义所需的 mutations   可以在其他组件修改变量
const mutations = {
    //更新集群信息
    updateCluster(state) {
        state.username = sessionStorage.getItem('username');
        state.token = sessionStorage.getItem('token');
        state.isroot = (parseInt(sessionStorage.getItem('isRoot')) == 1 ? true : false);
        state.exptime = parseInt(sessionStorage.getItem('exptime'));
        state.clientSt = parseInt(sessionStorage.getItem('clientSt'));
    },
    updateCount(state,status){
        if(status){
            state.errorCount ++;
        }else{
            state.errorCount = 0;
        }
    },
    createSocket(state){
        state.socket = new WebSocket(state.wsurl);
    },
    closeSocket(state){
        if(state.socket !== null){
            state.socket.close();
        }
    },
    setState(state,options){
        if(Object.prototype.toString.call(options) == '[object Object]'){
            state[options.attr] = options.val;
        }else if(Object.prototype.toString.call(options) == '[object Array]'){
            if(options.length>0){
                options.forEach((item)=>{
                    state[item.attr] = item.val;
                });
            }
        }
    }
}
// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})
