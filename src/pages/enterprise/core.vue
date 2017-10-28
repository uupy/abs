<template>
    <section class="panel-main" :style="styles">
        <template v-if="enterprise_type === 2 || enterprise_type === 4">
            <el-tabs v-model="active_name" @tab-click="handleClickTab">
                <el-tab-pane label="总览" name="overviews">
                    <el-row class="toolbar toolbar-top">
                        <div class="f-left">
                            <label>企业状态：</label>
                            <el-select size="small" v-model="enterprise_status" @change="filterEnterprise" placeholder="请选择">
                                <el-option v-for="(item,index) in enterprise_statuses" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                            <label style="padding-left:10px;">企业角色：</label>
                            <el-select size="small" v-model="enterpriseCurType" @change="filterEnterprise" placeholder="请选择">
                                <el-option v-for="(item,index) in enterpriseCurTypes" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                        </div>
                        <div class="f-right">
                            <el-input size="small" v-model="filterKeyword" placeholder="请输入关键字" icon="circle-cross" @focus="filterOnfocus = true" @blur="filterOnfocus = false" @click="clearFilter"></el-input>
                            <el-button size="small" type="primary" @click="filterEnterprise"><i class="el-icon-search"></i> 查询</el-button>
                            <el-button size="small" type="primary" @click="openAddEnterpriseDialog" v-if="enterprise_type === 2"><i class="el-icon-plus"></i> 新增</el-button>
                        </div>
                    </el-row>
                    <el-row :span="24">
                        <el-table :data="list" class="table-list">
                            <el-table-column type="index" label="序号" width="90"></el-table-column>
                            <el-table-column prop="code" label="企业编号"></el-table-column>
                            <el-table-column prop="name" label="企业名称"></el-table-column>
                            <el-table-column prop="type" label="企业角色">
                                <template slot-scope="scope">
                                    <span>{{entType[scope.row.type] ? entType[scope.row.type] : '未知'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="area" label="所属区域"></el-table-column>
                            <el-table-column prop="status" label="认证状态">
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.status == 2 ? 'success' : (scope.row.status == 3 ? 'danger':(scope.row.status == 1 ? 'warning':'default'))" close-transition>{{enterpriseStatus[scope.row.status] ? enterpriseStatus[scope.row.status] : '未知'}}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column inline-template :context="_self" label="操作" width="140">
                                <span>
                                    <span class="table-btn health" @click.stop="checkView(row)">企业详情</span>
                                    <span class="table-btn danger" v-if="enterprise_type === 2" @click.stop="deleteEnterprise(row)">删除</span>
                                </span>
                            </el-table-column>
                        </el-table>
                        <el-pagination v-if="pageTotal > 0" class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChange" @current-change="pageCurrentChange" :page-size="pageSize" :total="pageTotal"></el-pagination>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="集团公司" name="head_cp">
                    <el-row class="toolbar toolbar-top">
                        <div class="f-left">
                            <label>企业状态：</label>
                            <el-select size="small" v-model="enterprise_status" @change="filterEnterprise" placeholder="请选择">
                                <el-option v-for="(item,index) in enterprise_statuses" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                        </div>
                        <div class="f-right">
                            <el-input size="small" v-model="filterKeyword" placeholder="请输入关键字" icon="circle-cross" @focus="filterOnfocus = true" @blur="filterOnfocus = false" @click="clearFilter"></el-input>
                            <el-button size="small" type="primary" @click="filterEnterprise"><i class="el-icon-search"></i>查询</el-button>
                            <el-button size="small" type="primary" @click="openAddEnterpriseDialog" v-if="enterprise_type === 2"><i class="el-icon-plus"></i>新增</el-button>
                        </div>
                    </el-row>
                    <el-row :span="24">
                        <el-table :data="list" class="table-list">
                            <el-table-column type="index" label="序号" width="90"></el-table-column>
                            <el-table-column prop="code" label="企业编号"></el-table-column>
                            <el-table-column prop="name" label="企业名称"></el-table-column>
                            <el-table-column prop="status" label="认证状态">
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.status == 2 ? 'success' : (scope.row.status == 3 ? 'danger':(scope.row.status == 1 ? 'warning':'default'))" close-transition>{{enterpriseStatus[scope.row.status] ? enterpriseStatus[scope.row.status] : '未知'}}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column inline-template :context="_self" label="操作" width="140">
                                <span>
                                    <span class="table-btn health" @click.stop="checkView(row)">企业详情</span>
                                    <span class="table-btn danger" v-if="enterprise_type === 2" @click.stop="deleteEnterprise(row)">删除</span>
                                </span>
                            </el-table-column>
                        </el-table>
                        <el-pagination v-if="pageTotal > 0" class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChange" @current-change="pageCurrentChange" :page-size="pageSize" :total="pageTotal"></el-pagination>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="项目公司" name="project_cp">
                    <el-row class="toolbar toolbar-top">
                        <div class="f-left">
                            <label>企业状态：</label>
                            <el-select size="small" v-model="enterprise_status" @change="filterEnterprise" placeholder="请选择">
                                <el-option v-for="(item,index) in enterprise_statuses" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                            <label style="padding-left:10px;">所属区域：</label>
                            <el-select size="small" filterable v-model="enterprise_area" placeholder="请选择">
                                <el-option v-for="(item,index) in enterprise_areas" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                        </div>
                        <div class="f-right">
                            <el-input size="small" v-model="filterKeyword" placeholder="请输入关键字" icon="circle-cross" @focus="filterOnfocus = true" @blur="filterOnfocus = false" @click="clearFilter"></el-input>
                            <el-button size="small" type="primary" @click="filterEnterprise"><i class="el-icon-search"></i> 查询</el-button>
                            <el-button size="small" type="primary" @click="openAddEnterpriseDialog" v-if="enterprise_type === 2"><i class="el-icon-plus"></i> 新增</el-button>
                        </div>
                    </el-row>
                    <el-row :span="24">
                        <el-table :data="list" class="table-list">
                            <el-table-column type="index" label="序号" width="90"></el-table-column>
                            <el-table-column prop="code" label="企业编号"></el-table-column>
                            <el-table-column prop="name" label="企业名称"></el-table-column>
                            <el-table-column prop="area" label="所属区域"></el-table-column>
                            <el-table-column prop="status" label="认证状态">
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.status == 2 ? 'success' : (scope.row.status == 3 ? 'danger':(scope.row.status == 1 ? 'warning':'default'))" close-transition>{{enterpriseStatus[scope.row.status] ? enterpriseStatus[scope.row.status] : '未知'}}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column inline-template :context="_self" label="操作" width="140">
                                <span>
                                    <span class="table-btn health" @click.stop="checkView(row)">企业详情</span>
                                    <span class="table-btn danger" v-if="enterprise_type === 2" @click.stop="deleteEnterprise(row)">删除</span>
                                </span>
                            </el-table-column>
                        </el-table>
                        <el-pagination v-if="pageTotal > 0" class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChange" @current-change="pageCurrentChange" :page-size="pageSize" :total="pageTotal"></el-pagination>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </template>
        <template v-else>
            <el-row class="toolbar toolbar-top">
                <div class="f-left">
                    <label>企业状态：</label>
                    <el-select size="small" v-model="enterprise_status" @change="filterEnterprise" placeholder="请选择">
                        <el-option v-for="(item,index) in enterprise_statuses" :label="item.label" :value="item.value" :key="index"></el-option>
                    </el-select>
                    <label style="padding-left:10px;">企业角色：</label>
                    <el-select size="small" v-model="enterpriseCurType" @change="filterEnterprise" placeholder="请选择">
                        <el-option v-for="(item,index) in enterpriseCurTypes" :label="item.label" :value="item.value" :key="index"></el-option>
                    </el-select>
                </div>
                <div class="f-right">
                    <el-input size="small" v-model="filterKeyword" placeholder="请输入关键字" icon="circle-cross" @focus="filterOnfocus = true" @blur="filterOnfocus = false" @click="clearFilter"></el-input>
                    <el-button size="small" type="primary" @click="filterEnterprise"><i class="el-icon-search"></i> 查询</el-button>
                    <el-button size="small" type="primary" @click="openAddEnterpriseDialog" v-if="enterprise_type === 1 || enterprise_type === 2"><i class="el-icon-plus"></i> 新增</el-button>
                </div>
            </el-row>
            <el-row :span="24">
                <el-table :data="list" class="table-list">
                    <el-table-column type="index" label="序号" width="90"></el-table-column>
                    <el-table-column prop="code" label="企业编号"></el-table-column>
                    <el-table-column prop="name" label="企业名称"></el-table-column>
                    <el-table-column prop="type" label="企业角色">
                        <template slot-scope="scope">
                            <span>{{entType[scope.row.type] ? entType[scope.row.type] : '未知'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="area" label="所属区域"></el-table-column>
                    <el-table-column prop="status" label="认证状态">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.status == 2 ? 'success' : (scope.row.status == 3 ? 'danger':(scope.row.status == 1 ? 'warning':'default'))" close-transition>{{enterpriseStatus[scope.row.status] ? enterpriseStatus[scope.row.status] : '未知'}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column inline-template :context="_self" label="操作" width="140">
                        <span>
                            <span class="table-btn health" @click.stop="checkView(row)">企业详情</span>
                            <span class="table-btn danger" v-if="enterprise_type === 1 || enterprise_type === 2" @click.stop="deleteEnterprise(row)">删除</span>
                        </span>
                    </el-table-column>
                </el-table>
                <el-pagination v-if="pageTotal > 0" class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="pageTotal"></el-pagination>
            </el-row>
        </template>
        <!-- 对话框 -->
        <el-dialog size="tiny" title="新增企业" v-model="dialogVisibleAddNew" @close="cancelAddEnterprise('addForm')" :close-on-click-modal="false">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="90px">
                <el-form-item label="企业角色" prop="role">
                    <el-select v-model="addForm.role" placeholder="请选择企业角色">
                        <el-option v-for="(item,index) in addForm.enterpriseCurTypes" :label="item.label" :value="item.value" :key="index" v-if="item.value !== '2,4'"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="企业名称" prop="name">
                    <el-input v-model="addForm.name" placeholder="请输入企业名称"></el-input>
                </el-form-item>
                <el-form-item label="所属区域" prop="area" v-if="addForm.role === '4' && active_name !== 'head_cp'">
                    <el-input v-model="addForm.area" placeholder="请输入所属区域"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addEnterprise('addForm')" type="primary">确 认</el-button>
                <el-button @click="cancelAddEnterprise('addForm')">取 消</el-button>
            </div>
            <vs-loading :isShow="innerLoading" className="vs-inner-loading"></vs-loading>
        </el-dialog>
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    import Enterprise from '@/api/enterprise/enterprise.js'
    export default {
        data() {
            return {
                filterOnfocus:false,
                filterKeyword:'',
                active_name:'overviews',
                entType:ABS_TYPE['enterprise'] ? ABS_TYPE['enterprise'] : {},
                enterpriseStatus:ABS_STATUS['enterprise'] ? ABS_STATUS['enterprise'] : {},
                enterprise_status:0,
                enterprise_statuses:[
                    {label:'全部',value:0},
                    {label:'创建中',value:1},
                    {label:'已认证',value:2}
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
                enterpriseCurType:'2,4',
                enterpriseCurTypes:[
                    {label:'全部',value:'2,4'},
                    {label:'集团公司',value:'2'},
                    {label:'项目公司',value:'4'},
                ],
                curPage:1,
                currentPage:1,
                pageSize:10,
                pageTotal:0,
                list:[],
                dialogVisibleAddNew:false,
                addForm:{
                    name:'',
                    role:2,
                    area:'',
                    enterpriseCurTypes:[]
                },
                rules:{
                    name:[
                        {required:true,message:'企业名称不能为空',trigger: 'change'}
                    ],
                    area:[
                        {required:true,message:'所属区域不能为空',trigger: 'change'}
                    ]
                }
            } 
        },
        mixins:[Common,Enterprise],
        methods: {
            handleClickTab(type){
                const self = this;
                self.enterprise_status = 0;
                self.enterpriseCurType = '2,4';
                self.curPage = 1;
                self.currentPage = 1;
                self.filterKeyword = '';
                sessionStorage.setItem('enterpriseTypeTabName',type.name);
                self.enterpriseActiveNameSwitch(false);
            },
            // 列表当前页改变
            pageCurrentChange(val){
                this.curPage = val;
                this.getEnterpriseList({status:parseInt(this.enterprise_status),type:this.enterpriseCurType});
            },
            // 列表条数改变
            pageSizeChange(val){
                this.pageSize = val;
                this.getEnterpriseList({status:parseInt(this.enterprise_status),type:this.enterpriseCurType});
            },
            // 过滤列表
            filterEnterprise(){
                this.currentPage = 1;
                this.enterpriseActiveNameSwitch(true);
            },
            enterpriseActiveNameSwitch(filter){
                const self = this;
                switch(self.active_name){
                    case 'overviews':
                        break;
                    case 'head_cp':
                        self.enterpriseCurType = '2';
                        break;
                    case 'project_cp':
                        self.enterpriseCurType = '4';
                        break;
                    default :
                        break;
                }
                self.getEnterpriseList({status:parseInt(self.enterprise_status),type:self.enterpriseCurType,filter:filter});
            },
            // 清空查询
            clearFilter(type){
                this.filterKeyword = '';
                this.currentPage = 1;
                this.getEnterpriseList({status:parseInt(this.enterprise_status),type:this.enterpriseCurType,filter:true});
            },
            checkView(row){
                this.saveStorageState([
                    {attr:'set_menu_type',val:true,type:'boolean'},
                    {attr:'enterpriseId',val:row.id,type:'number'},
                    {attr:'enterpriseType',val:row.type,type:'number'},
                    {attr:'enterpriseName',val:row.name,type:'string'},
                    {attr:'enterpriseIdChange',val:true,type:'boolean'}
                ]);
                this.$router.push({ path: '/pages/core/views'});
            },
            openAddEnterpriseDialog(){
                if(this.enterprise_type === 2){
                    switch(this.active_name){
                        case 'overviews': 
                            this.addForm.enterpriseCurTypes = [
                                {label:'集团公司',value:'2'},
                                {label:'项目公司',value:'4'}
                            ];
                            this.addForm.role = '2';
                            break;
                        case 'head_cp': 
                            this.addForm.enterpriseCurTypes = [
                                {label:'集团公司',value:'2'}
                            ];
                            this.addForm.role = '2';
                            break;
                        case 'project_cp': 
                            this.addForm.enterpriseCurTypes = [
                                {label:'项目公司',value:'4'}
                            ];
                            this.addForm.role = '4';
                            break;
                    }
                }else{
                    this.addForm.enterpriseCurTypes = [
                        {label:'集团公司',value:'2'},
                        {label:'项目公司',value:'4'}
                    ];
                    this.addForm.role = '2';
                }
                this.dialogVisibleAddNew = true;
            },
            cancelAddEnterprise(formName){
                this.$refs[formName].resetFields();
                this.dialogVisibleAddNew = false;
            },
            enterKeyup(e){
                const self = this;
                const ev = e || window.event;
                if(ev.keyCode == 13){
                    if(self.dialogVisibleAddNew){
                        self.addEnterprise('addForm');
                    }else if(self.filterOnfocus){
                        self.filterEnterprise();
                    }
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
                if(self.enterprise_type === 2 || self.enterprise_type === 4){
                    if(sessionStorage.getItem('enterpriseTypeTabName')){
                        const typeName = sessionStorage.getItem('enterpriseTypeTabName');
                        self.active_name = typeName;
                        self.enterpriseActiveNameSwitch(true);
                    }else{
                        self.getEnterpriseList({type:this.enterpriseCurType});
                    }
                }else{
                    self.getEnterpriseList({type:this.enterpriseCurType});
                }
                document.addEventListener("keyup", self.enterKeyup, false);
            });
        },
        watch:{

        },
        destroyed() {
            sessionStorage.removeItem('enterpriseTypeTabName')
            document.removeEventListener("keyup", self.enterKeyup, false);
        }
    }
</script>

