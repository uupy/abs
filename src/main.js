import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import {Row,Col,Upload,Button,Radio,RadioGroup,Input,Select,Option,Switch,Form,FormItem,Table,TableColumn,Tag,Pagination,Message,MessageBox,Menu,Submenu,MenuItem,Tabs,TabPane,Breadcrumb,BreadcrumbItem,DatePicker,Dropdown,DropdownMenu,DropdownItem,Dialog,Tooltip} from 'element-ui'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './vuex/store'
import routes from './routes'
//页面顶部进度条
import NProgress from 'nprogress'
import Util from './assets/js/common'
import Toast from './assets/js/toast'
import 'nprogress/nprogress.css'
import './assets/css/flex.css'
import './assets/css/optiscroll.css'
import './assets/css/iconfont.css'
import './assets/css/style.css'
// Mock.bootstrap();

//去除生产模式的提示
Vue.config.productionTip = false;
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Toast)

//ElementUI
Vue.use(Row)
Vue.use(Upload)
Vue.use(Col)
// Vue.use(Card)
Vue.use(Button)
Vue.use(Radio)
Vue.use(RadioGroup)
// Vue.use(Checkbox)
// Vue.use(CheckboxGroup)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Pagination)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dialog)
Vue.use(Tooltip)
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

NProgress.configure({
    showSpinner: false
});
//设置全局Util
window.Util = Util;
Vue.prototype.$nprogress = NProgress;

const router = new VueRouter({
    routes,
    mode: 'history',
    history: true
})
router.beforeEach((to, from, next) => {
    // debugger
    if (to.path == '/login') {
        localStorage.removeItem('username');
        localStorage.clear();
    }
    let user = localStorage.getItem('username');
    let enterprise_type = parseInt(localStorage.getItem('enterprise_type') || '0');
    if (!user && to.path != '/login') {
        next({
            path: '/login'
        })
    } else {
        if (to.path == '/' || to.path == '') {
            switch(enterprise_type){
                case 1:
                    next({
                        path: '/pages/all_enterprise'
                    })
                    break;
                case 2:
                    next({
                        path: '/pages/core'
                    })
                    break;
                default:
                    next({
                        path: '/pages/enterprise/views'
                    })
                    break;
            }
        } else {
            var routes = router.options.routes;
            routes.forEach((menu)=>{
                if(Util.isArray(menu.children)){
                    menu.children.forEach((submenu)=>{
                        if(submenu.path.indexOf('views') === -1){
                            if(to.path === submenu.path){
                                if(submenu.show[enterprise_type]){
                                    next()
                                }else{
                                    next({
                                        path: '/404'
                                    })
                                }
                            }
                        }else{
                            next()
                        }
                    });
                }
            });
            next()
        }
    }
})
router.afterEach(route => {
    // console.log(route)
});

new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: {
      App
    }
}).$mount('#app')