import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
// import ElementUI from 'element-ui'
import {Row,Col,Upload,Card,Button,Radio,RadioGroup,Checkbox,CheckboxGroup,Input,Select,Option,Switch,Form,FormItem,Table,TableColumn,Tag,Pagination,Message,MessageBox,Menu,Submenu,MenuItem,Tabs,TabPane,Breadcrumb,BreadcrumbItem,DatePicker,Dropdown,DropdownMenu,DropdownItem,Dialog,Tooltip} from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './vuex/store'
import routes from './routes'
//页面顶部进度条
import NProgress from 'nprogress'              
import Base64 from 'base-64'
import MD5 from 'MD5'
import Util from './assets/js/common'
import Toast from './assets/js/toast'
import 'nprogress/nprogress.css'
import './assets/css/flex.css'
import './assets/css/optiscroll.css'
import './assets/css/style.css'
// import Mock from './mock';
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
Vue.use(Card)
Vue.use(Button)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
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
window.MD5 = MD5;
window.Base64 = Base64;
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
    if (!user && to.path != '/login') {
        next({
            path: '/login'
        })
    } else {
        if (to.path == '/' || to.path == '') {
            next({
                path: '/pages/core'
            })
        } else {
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