
const Login = resolve => require(['./pages/Login.vue'], resolve)
const NotFound = resolve => require(['./pages/404.vue'], resolve)
const Home = resolve => require(['./pages/Home.vue'], resolve)

//企业管理
const EnterpriseViews = resolve => require(['./pages/enterprise/views.vue'],resolve)
const EnterpriseList = resolve => require(['./pages/enterprise/list.vue'],resolve)
const EnterpriseSupplier = resolve => require(['./pages/enterprise/supplier.vue'],resolve)
const EnterpriseCapital = resolve => require(['./pages/enterprise/capital.vue'],resolve)

//协议管理
const ProtocolList = resolve => require(['./pages/protocol/list.vue'],resolve)
const ProtocolDetail = resolve => require(['./pages/protocol/protocol-detail.vue'],resolve)
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
        leaf:true,
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        leaf:true,
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
                name: '项目公司',
                show:{
                    1:true,
                    2:false,
                    3:false,
                    4:true,
                    5:false,
                }
            },
            {
                path: '/pages/enterprise/supplier',
                component: EnterpriseSupplier,
                name: '供应商',
                show:{
                    1:true,
                    2:false,
                    3:false,
                    4:true,
                    5:false,
                }
            },
            {
                path: '/pages/enterprise/capital',
                component: EnterpriseCapital,
                name: '资金方',
                show:{
                    1:false,
                    2:false,
                    3:false,
                    4:true,
                    5:false,
                }
            },
            {
                path: '/pages/enterprise/views',
                component: EnterpriseViews,
                name: '企业信息',
                show:{
                    1:false,
                    2:true,
                    3:true,
                    4:false,
                    5:true,
                }
            },
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
                name: '协议清单',
                show:{
                    1:true,
                    2:true,
                    3:true,
                    4:true,
                    5:true,
                }
            },
            {
                path: '/pages/protocol/list/:protocolId',
                component: ProtocolDetail,
                name: '协议详情',
                hidden: true,
                show:{
                    1:true,
                    2:true,
                    3:true,
                    4:true,
                    5:true,
                }
            },
            {
                path: '/pages/protocol/stamped',
                component: ProtocolStamped,
                name: '已盖章协议',
                show:{
                    1:true,
                    2:true,
                    3:true,
                    4:true,
                    5:true,
                }
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
                name: '资产列表',
                show:{
                    1:true,
                    2:true,
                    3:true,
                    4:true,
                    5:true,
                }
            },
            {
                path: '/pages/assets/statistics',
                component: AssetsStatistics,
                name: '数据统计',
                show:{
                    1:true,
                    2:true,
                    3:true,
                    4:true,
                    5:true,
                }
            }
        ]
    },
    {
        path: '*',
        leaf:true,
        hidden: true,
        redirect: {
            path: '/404'
        }
    }
];

export default routes;