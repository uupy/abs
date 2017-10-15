
const Login = resolve => require(['./pages/Login.vue'], resolve)
const NotFound = resolve => require(['./pages/404.vue'], resolve)
const Home = resolve => require(['./pages/Home.vue'], resolve)

//企业管理
const EnterpriseViews = resolve => require(['./pages/enterprise/views.vue'],resolve)
const EnterpriseList = resolve => require(['./pages/enterprise/list.vue'],resolve)
const Service = resolve => require(['./pages/enterprise/Service.vue'],resolve)

//协议管理
const ProtocolList = resolve => require(['./pages/protocol/list.vue'],resolve)
const ProtocolStamped = resolve => require(['./pages/protocol/stamped.vue'],resolve)

//资产管理
const AssetsList = resolve => require(['./pages/assets/list.vue'],resolve)
const AssetsStatistics = resolve => require(['./pages/assets/statistics.vue'],resolve)


//结算管理


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '首页',
    //     iconCls: 'im-icon-analysis',
    //     leaf: true,
    //     children: [{
    //         path: '/pages/cluster',
    //         component: Cluster,
    //         name: '集群概览'
    //     }]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '集群',
    //     iconCls: 'im-icon-list', 
    //     leaf: true,
    //     children: [{
    //         path: '/pages/userclusters',
    //         component: Clusters,
    //         name: '集群设置 '
    //     }],
    //     isuser: true
    // },
    {
        path: '/',
        component: Home,
        name: '企业管理',
        iconCls: 'im-icon-management',
        children: [
            {
                path: '/pages/enterprise',
                component: EnterpriseList,
                name: '客户列表'
            },
            {
                path: '/pages/enterprise/views',
                component: EnterpriseViews,
                name: '企业信息',
                hidden:true
            },
            {
                path: '/pages/service',
                component: Service,
                name: '服务方案'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '协议管理',
        iconCls: 'im-icon-management',
        children: [
            {
                path: '/pages/protocol/list',
                component: ProtocolList,
                name: '协议清单'
            },
            {
                path: '/pages/protocol/stamped',
                component: ProtocolStamped,
                name: '已盖章协议'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '资产管理',
        iconCls: 'im-icon-management',
        children: [
            {
                path: '/pages/assets/list',
                component: AssetsList,
                name: '资产列表'
            },
            {
                path: '/pages/assets/statistics',
                component: AssetsStatistics,
                name: '数据统计'
            }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: {
            path: '/404'
        }
    }
];

export default routes;