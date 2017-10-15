<template>
    <section class="panel-main" :style="styles">
        <el-row class="toolbar toolbar-top">
            <div class="f-left">
                <label>企业状态：</label>
                <el-select size="small" v-model="enterprise_status" placeholder="请选择">
                    <el-option v-for="(item,index) in enterprise_statuses" :label="item.label" :value="item.value" :key="index"></el-option>
                </el-select>
                <label style="padding-left:10px;">企业角色：</label>
                <el-select size="small" v-model="enterprise_role" placeholder="请选择">
                    <el-option v-for="(item,index) in enterprise_roles" :label="item.label" :value="item.value" :key="index"></el-option>
                </el-select>
            </div>
            <div class="f-right">
                <el-input size="small" v-model="filter_name" placeholder="请输入关键字" icon="circle-cross" @click="clearFilter"></el-input>
                <el-button size="small" type="primary" @click="getclient"><i class="el-icon-search"></i>查询</el-button>
            </div>
        </el-row>
        <el-row :span="24">
            <el-table :data="clients" class="table-list">
                <el-table-column prop="index" label="序号" width="90"></el-table-column>
                <el-table-column prop="id" label="企业编号"></el-table-column>
                <el-table-column prop="name" label="企业名称"></el-table-column>
                <el-table-column prop="role" label="企业角色"></el-table-column>
                <el-table-column prop="principal" label="负责人"></el-table-column>
                <el-table-column prop="position" label="负责人职位"></el-table-column>
                <el-table-column prop="status" label="企业状态">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status == '已认证' ? 'success' : (scope.row.status == '认证失败' ? 'danger':(scope.row.status == '创建中' ? 'warning':'default'))" close-transition>{{scope.row.status}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column inline-template :context="_self" label="操作" width="160">
                    <span>
                        <span class="table-btn health" @click.stop="checkView(row)">企业详情</span>
                        <span class="table-btn danger">删除</span>
                    </span>
                </el-table-column>
            </el-table>
            <el-pagination class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="clientsSizeChange" @current-change="clientsCurrentChange" :page-size="clients_pagesize" :total="clients_total"></el-pagination>
        </el-row>
    </section>
</template>
<script>
    import Common from '../../mixins/common.js'
    import Clients from '../../api/clients.js'
    // import PagerLimit from '../../mixins/pagerLimit.js'
    export default {
        data() {
            return {
                filter_name:'',
                enterprise_status:0,
                enterprise_statuses:[
                    {label:'全部',value:0},
                    {label:'已认证',value:1},
                    {label:'创建中',value:2},
                ],
                enterprise_role:0,
                enterprise_roles:[
                    {label:'全部',value:0},
                    {label:'核心企业',value:1},
                    {label:'供应商',value:2},
                ],
                clients_pagenum:10,
                clients_pagesize:10,
                clients_total:10,
                clients:[
                    {
                        index:1,
                        id:'01',
                        name:'碧桂园控股有限公司',
                        role:'核心企业',
                        principal:'张三',
                        position:'总经理',
                        status:'已认证'
                    },
                    {
                        index:2,
                        id:'02',
                        name:'供应商A',
                        role:'供应商',
                        principal:'李四',
                        position:'财务总监',
                        status:'创建中'
                    },
                    {
                        index:3,
                        id:'01',
                        name:'碧桂园控股有限公司',
                        role:'核心企业',
                        principal:'张三',
                        position:'总经理',
                        status:'已认证'
                    },
                    {
                        index:4,
                        id:'02',
                        name:'供应商A',
                        role:'供应商',
                        principal:'李四',
                        position:'财务总监',
                        status:'创建中'
                    },
                    {
                        index:5,
                        id:'01',
                        name:'碧桂园控股有限公司',
                        role:'核心企业',
                        principal:'张三',
                        position:'总经理',
                        status:'已认证'
                    },
                    {
                        index:6,
                        id:'02',
                        name:'供应商A',
                        role:'供应商',
                        principal:'李四',
                        position:'财务总监',
                        status:'创建中'
                    },
                    {
                        index:7,
                        id:'01',
                        name:'碧桂园控股有限公司',
                        role:'核心企业',
                        principal:'张三',
                        position:'总经理',
                        status:'已认证'
                    },
                    {
                        index:8,
                        id:'02',
                        name:'供应商A',
                        role:'供应商',
                        principal:'李四',
                        position:'财务总监',
                        status:'创建中'
                    },
                    {
                        index:9,
                        id:'01',
                        name:'碧桂园控股有限公司',
                        role:'核心企业',
                        principal:'张三',
                        position:'总经理',
                        status:'已认证'
                    },
                    {
                        index:10,
                        id:'02',
                        name:'供应商A',
                        role:'供应商',
                        principal:'李四',
                        position:'财务总监',
                        status:'创建中'
                    }
                ]
            } 
        },
        mixins:[Common,Clients],
        methods: {
            clientsCurrentChange(val) {
                
            },
            clientsSizeChange(val){
                
            },
            // 查询告警
            getclient(){
                const self = this;
            },
            clearFilter(type){
                const self = this;
                
            },
            checkView(row){
                this.$router.push({ path: '/pages/enterprise/views' });
            },
            enterKeyup(e){
                const self = this;
                const ev = e || window.event;
                if(ev.keyCode == 13){
                    
                }
            }
        },
        mounted() {
            const self = this;
            self.$nextTick(()=>{
                document.addEventListener("keyup", self.enterKeyup, false);
                
            });
        },
        watch:{
            
        },
        destroyed() {
            document.removeEventListener("keyup", self.enterKeyup, false);
        }
    }
</script>

