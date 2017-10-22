<template>
    <section class="panel-main" :style="styles">
        <template v-if="enterprise_type === 2 || enterprise_type === 4">
            <el-tabs v-model="active_name" @tab-click="handleClickTab">
                <el-tab-pane label="总览" name="overviews">
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
                            <el-button size="small" type="primary" @click="dialog_add_client = true" v-if="enterprise_type === 2"><i class="el-icon-plus"></i>新增</el-button>
                        </div>
                    </el-row>
                    <el-row :span="24">
                        <el-table :data="clients" class="table-list">
                            <el-table-column prop="index" label="序号" width="90"></el-table-column>
                            <el-table-column prop="id" label="企业编号"></el-table-column>
                            <el-table-column prop="name" label="企业名称"></el-table-column>
                            <el-table-column prop="role" label="企业角色"></el-table-column>
                            <el-table-column prop="area" label="所属区域"></el-table-column>
                            <el-table-column prop="status" label="认证状态">
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.status == '已认证' ? 'success' : (scope.row.status == '认证失败' ? 'danger':(scope.row.status == '创建中' ? 'warning':'default'))" close-transition>{{scope.row.status}}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column inline-template :context="_self" label="操作" width="140">
                                <span>
                                    <span class="table-btn health" @click.stop="checkView(row)">企业详情</span>
                                    <span class="table-btn danger" v-if="enterprise_type === 2">删除</span>
                                </span>
                            </el-table-column>
                        </el-table>
                        <el-pagination class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="clientsSizeChange" @current-change="clientsCurrentChange" :page-size="clients_pagesize" :total="clients_total"></el-pagination>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="集团公司" name="head_cp">
                    <el-row class="toolbar toolbar-top">
                        <div class="f-left">
                            <label>企业状态：</label>
                            <el-select size="small" v-model="enterprise_status" placeholder="请选择">
                                <el-option v-for="(item,index) in enterprise_statuses" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                        </div>
                        <div class="f-right">
                            <el-input size="small" v-model="filter_name" placeholder="请输入关键字" icon="circle-cross" @click="clearFilter"></el-input>
                            <el-button size="small" type="primary" @click="getclient"><i class="el-icon-search"></i>查询</el-button>
                            <el-button size="small" type="primary" @click="dialog_add_client = true" v-if="enterprise_type === 2"><i class="el-icon-plus"></i>新增</el-button>
                        </div>
                    </el-row>
                    <el-row :span="24">
                        <el-table :data="head_cps" class="table-list">
                            <el-table-column prop="index" label="序号" width="90"></el-table-column>
                            <el-table-column prop="id" label="企业编号"></el-table-column>
                            <el-table-column prop="name" label="企业名称"></el-table-column>
                            <!-- <el-table-column prop="role" label="企业角色"></el-table-column> -->
                            <!-- <el-table-column prop="area" label="所属区域"></el-table-column> -->
                            <el-table-column prop="status" label="认证状态">
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.status == '已认证' ? 'success' : (scope.row.status == '认证失败' ? 'danger':(scope.row.status == '创建中' ? 'warning':'default'))" close-transition>{{scope.row.status}}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column inline-template :context="_self" label="操作" width="140">
                                <span>
                                    <span class="table-btn health" @click.stop="checkView(row)">企业详情</span>
                                    <span class="table-btn danger" v-if="enterprise_type === 2">删除</span>
                                </span>
                            </el-table-column>
                        </el-table>
                        <el-pagination class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="clientsSizeChange" @current-change="clientsCurrentChange" :page-size="clients_pagesize" :total="clients_total"></el-pagination>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="项目公司" name="project_cp">
                    <el-row class="toolbar toolbar-top">
                        <div class="f-left">
                            <label>企业状态：</label>
                            <el-select size="small" v-model="enterprise_status" placeholder="请选择">
                                <el-option v-for="(item,index) in enterprise_statuses" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                            <label style="padding-left:10px;">所属区域：</label>
                            <el-select size="small" filterable v-model="enterprise_area" placeholder="请选择">
                                <el-option v-for="(item,index) in enterprise_areas" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                        </div>
                        <div class="f-right">
                            <el-input size="small" v-model="filter_name" placeholder="请输入关键字" icon="circle-cross" @click="clearFilter"></el-input>
                            <el-button size="small" type="primary" @click="getclient"><i class="el-icon-search"></i>查询</el-button>
                            <el-button size="small" type="primary" @click="dialog_add_client = true" v-if="enterprise_type === 2"><i class="el-icon-plus"></i>新增</el-button>
                        </div>
                    </el-row>
                    <el-row :span="24">
                        <el-table :data="project_cps" class="table-list">
                            <el-table-column prop="index" label="序号" width="90"></el-table-column>
                            <el-table-column prop="id" label="企业编号"></el-table-column>
                            <el-table-column prop="name" label="企业名称"></el-table-column>
                            <!-- <el-table-column prop="role" label="企业角色"></el-table-column> -->
                            <el-table-column prop="area" label="所属区域"></el-table-column>
                            <el-table-column prop="status" label="认证状态">
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.status == '已认证' ? 'success' : (scope.row.status == '认证失败' ? 'danger':(scope.row.status == '创建中' ? 'warning':'default'))" close-transition>{{scope.row.status}}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column inline-template :context="_self" label="操作" width="140">
                                <span>
                                    <span class="table-btn health" @click.stop="checkView(row)">企业详情</span>
                                    <span class="table-btn danger" v-if="enterprise_type === 2">删除</span>
                                </span>
                            </el-table-column>
                        </el-table>
                        <el-pagination class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="clientsSizeChange" @current-change="clientsCurrentChange" :page-size="clients_pagesize" :total="clients_total"></el-pagination>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </template>
        <template v-else>
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
                    <el-button size="small" type="primary" @click="dialog_add_client = true"><i class="el-icon-plus"></i>新增</el-button>
                </div>
            </el-row>
            <el-row :span="24">
                <el-table :data="clients" class="table-list">
                    <el-table-column prop="index" label="序号" width="90"></el-table-column>
                    <el-table-column prop="id" label="企业编号"></el-table-column>
                    <el-table-column prop="name" label="企业名称"></el-table-column>
                    <el-table-column prop="role" label="企业角色"></el-table-column>
                    <el-table-column prop="area" label="所属区域"></el-table-column>
                    <el-table-column prop="status" label="认证状态">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.status == '已认证' ? 'success' : (scope.row.status == '认证失败' ? 'danger':(scope.row.status == '创建中' ? 'warning':'default'))" close-transition>{{scope.row.status}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column inline-template :context="_self" label="操作" width="140">
                        <span>
                            <span class="table-btn health" @click.stop="checkView(row)">企业详情</span>
                            <span class="table-btn danger">删除</span>
                        </span>
                    </el-table-column>
                </el-table>
                <el-pagination class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="clientsSizeChange" @current-change="clientsCurrentChange" :page-size="clients_pagesize" :total="clients_total"></el-pagination>
            </el-row>
        </template>
        <!-- 对话框 -->
        <el-dialog size="tiny" title="新增项目企业" v-model="dialog_add_client" @close="cancelAddClient('add_form')" :close-on-click-modal="false">
            <el-form :model="add_form" :rules="rules" ref="add_form" label-width="90px">
                <el-form-item label="企业角色" prop="role">
                    <el-select v-model="add_form.role" placeholder="请选择企业角色">
                        <el-option v-for="(item,index) in enterprise_roles" :label="item.label" :value="item.value" :key="index" v-if="item.value !== 0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="企业名称" prop="name">
                    <el-input v-model="add_form.name" placeholder="请输入企业名称"></el-input>
                </el-form-item>
                <!-- <el-form-item label="负责人" prop="principal">
                    <el-input v-model="add_form.principal" placeholder="请输入负责人"></el-input>
                </el-form-item>
                <el-form-item label="负责人职位" prop="position">
                    <el-input v-model="add_form.position" placeholder="请输入负责人职位"></el-input>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary">确 认</el-button>
                <el-button @click="cancelAddClient('add_form')">取 消</el-button>
            </div>
            <vs-loading :isShow="innerLoading" className="vs-inner-loading"></vs-loading>
        </el-dialog>
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
                active_name:'overviews',
                enterprise_status:0,
                enterprise_statuses:[
                    {label:'全部',value:0},
                    {label:'已认证',value:1},
                    {label:'创建中',value:2},
                ],
                enterprise_area:'',
                enterprise_areas:[
                    {label:'全部',value:0},
                    {label:'华南',value:1},
                    {label:'华北',value:2},
                    {label:'华中',value:3},
                    {label:'华东',value:4},
                    {label:'西南',value:5},
                    {label:'西北',value:6},
                ],
                enterprise_role:0,
                enterprise_roles:[
                    {label:'全部',value:0},
                    {label:'集团公司',value:1},
                    {label:'项目公司',value:2},
                ],
                clients_pagenum:10,
                clients_pagesize:10,
                clients_total:10,
                clients:[
                    {
                        index:1,
                        id:'BGYA0001',
                        name:'碧桂园集团控股有限公司',
                        role:'集团公司',
                        area:'无',
                        status:'创建中'
                    },
                    {
                        index:2,
                        id:'BGYB0001',
                        name:'碧桂园佛山项目公司',
                        role:'项目公司',
                        area:'华南',
                        status:'已认证'
                    },
                    {
                        index:3,
                        id:'BGYB0002',
                        name:'碧桂园大连项目公司',
                        role:'项目公司',
                        area:'华北',
                        status:'已认证'
                    }
                ],
                head_cps:[
                    {
                        index:1,
                        id:'BGYA0001',
                        name:'碧桂园集团控股有限公司',
                        role:'集团公司',
                        area:'无',
                        status:'创建中'
                    },
                ],
                project_cps:[
                    {
                        index:1,
                        id:'BGYB0001',
                        name:'碧桂园佛山项目公司',
                        role:'项目公司',
                        area:'华南',
                        status:'已认证'
                    },
                    {
                        index:2,
                        id:'BGYB0002',
                        name:'碧桂园大连项目公司',
                        role:'项目公司',
                        area:'华北',
                        status:'已认证'
                    }
                ],
                dialog_add_client:false,
                add_form:{
                    name:'',
                    role:1,
                    principal:'',
                    position:''
                },
                rules:{}
            } 
        },
        mixins:[Common,Clients],
        methods: {
            handleClickTab(type){},
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
                this.$router.push({ path: '/pages/core/views' });
            },
            cancelAddClient(){
                this.dialog_add_client = false;
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
                self.saveStorageState({
                    attr:'nav_menu_type',
                    val:3,
                    type:'number'
                });
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

