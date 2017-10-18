<template>
    <section class="panel-main">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="未融资数据" name="first">
                <el-row class="toolbar toolbar-top">
                    <div class="f-left">
                        <label>项目公司：</label>
                        <el-select size="small" v-model="currentCompany" placeholder="请选择">
                            <el-option v-for="(item,index) in companyList" :label="item.label" :value="item.value" :key="index"></el-option>
                        </el-select>                
                    </div>
                    <div class="f-right">
                        <el-button type='primary' @click='supply("first")'>融资申请</el-button>
                    </div>
                </el-row>
                <el-row>
                    <el-table :data="propertyList"  class='table-list'>
                        <el-table-column label="序号"  align='center'>
                            <template slot-scope='scope'>
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="company" label="项目公司" align='center'></el-table-column>
                        <el-table-column prop="supplier" label="供应商" align='center'></el-table-column>         
                        <el-table-column prop="fpno" label="发票号" align='center'></el-table-column>         
                        <el-table-column prop="fpsum" label="发票金额" align='center'></el-table-column>         
                        <el-table-column prop="fpdate" label="发票日期" align='center'></el-table-column>         
                        <el-table-column label="发票附件" align='center'>
                            <template slot-scope='scope'>
                                <el-button v-if='scope.row.fpfujian&&scope.row.fpfujian!=""' size='small'>查看</el-button>
                                <el-upload v-else
                                  class="upload-demo"
                                  action="https://jsonplaceholder.typicode.com/posts/"
                                  :on-preview="handlePreview"
                                  :on-remove="handleRemove">
                                  <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload> 
                            </template>
                        </el-table-column>         
                        <el-table-column prop="danjuhao" label="单据号" align='center'></el-table-column>         
                        <el-table-column label="单据附件" align='center'>                            
                            <template slot-scope='scope'>
                                <el-button v-if='scope.row.danjufujian&&scope.row.danjufujian!=""' size='small'>查看</el-button>
                                <el-upload v-else
                                  class="upload-demo"
                                  action="https://jsonplaceholder.typicode.com/posts/"
                                  :on-preview="handlePreview"
                                  :on-remove="handleRemove">
                                  <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload> 
                            </template>
                        </el-table-column>         
                        <el-table-column label="ERP审批表" align='center'>
                            <template slot-scope='scope'>
                                <el-button v-if='scope.row.erp&&scope.row.erp!=""' size='small'>查看</el-button>
                                <el-upload v-else
                                  class="upload-demo"
                                  action="https://jsonplaceholder.typicode.com/posts/"
                                  :on-preview="handlePreview"
                                  :on-remove="handleRemove">
                                  <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload> 
                            </template>
                        </el-table-column>         
                        <el-table-column label="审批附件" align='center'>
                            <template slot-scope='scope'>
                                <el-button v-if='scope.row.erpfujian&&scope.row.erpfujian!=""' size='small'>查看</el-button>
                                <el-upload v-else
                                  class="upload-demo"
                                  action="https://jsonplaceholder.typicode.com/posts/"
                                  :on-preview="handlePreview"
                                  :on-remove="handleRemove">
                                  <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload> 
                            </template>
                        </el-table-column>         
                    </el-table>
                    <el-pagination class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="clientsSizeChange" @current-change="clientsCurrentChange" :page-size="clients_pagesize" :total="clients_total"></el-pagination>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="应付数据" name="second">
                <el-row class="toolbar toolbar-top">
                    <div class="f-left">
                        <label>项目公司：</label>
                        <el-select size="small" v-model="currentCompany" placeholder="请选择">
                            <el-option v-for="(item,index) in companyList" :label="item.label" :value="item.value" :key="index"></el-option>
                        </el-select>                
                    </div>
                    <div class="f-right">
                        <!-- <el-button type='primary' @click='supply("sencond")'>融资申请</el-button> -->
                    </div>
                </el-row>
                <el-row>
                    <el-table :data="propertyList"  class='table-list'>
                        <el-table-column label="序号"  align='center'>
                            <template slot-scope='scope'>
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        
                        <el-table-column prop="company" label="项目公司" align='center'></el-table-column>
                        <el-table-column prop="supplier" label="供应商" align='center'></el-table-column>         
                        <el-table-column prop="fpno" label="发票号" align='center'></el-table-column>         
                        <el-table-column prop="fpsum" label="发票金额" align='center'></el-table-column>         
                        <el-table-column prop="fpdate" label="发票日期" align='center'></el-table-column>         
                        <el-table-column label="发票附件" align='center'>
                            <template slot-scope='scope'>
                                <el-button v-if='scope.row.fpfujian&&scope.row.fpfujian!=""' size='small'>查看</el-button>
                                <el-upload v-else
                                  class="upload-demo"
                                  action="https://jsonplaceholder.typicode.com/posts/"
                                  :on-preview="handlePreview"
                                  :on-remove="handleRemove">
                                  <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload> 
                            </template>
                        </el-table-column>         
                        <el-table-column prop="danjuhao" label="单据号" align='center'></el-table-column>         
                        <el-table-column label="单据附件" align='center'>
                            <template slot-scope='scope'>
                                <el-button v-if='scope.row.danjufujian&&scope.row.danjufujian!=""' size='small'>查看</el-button>
                                <el-upload v-else
                                  class="upload-demo"
                                  action="https://jsonplaceholder.typicode.com/posts/"
                                  :on-preview="handlePreview"
                                  :on-remove="handleRemove">
                                  <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload> 
                            </template>
                        </el-table-column>         
                        <el-table-column label="ERP审批表" align='center'>
                            <template slot-scope='scope'>
                                <el-button v-if='scope.row.erp&&scope.row.erp!=""' size='small'>查看</el-button>
                                <el-upload v-else
                                  class="upload-demo"
                                  action="https://jsonplaceholder.typicode.com/posts/"
                                  :on-preview="handlePreview"
                                  :on-remove="handleRemove">
                                  <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload> 
                            </template>
                        </el-table-column>  
                        <el-table-column prop='status' label="状态"  align='center'>
                            <template slot-scope='scope'>
                                <el-tag :type="scope.row.status == '1' ? 'success' : (scope.row.status == '2' ? 'warning':'default')" close-transition>{{propertyStatus[scope.row.status]}}</el-tag>
                            </template>                            
                        </el-table-column>       
                        <el-table-column label="审批附件" align='center'>
                            <template slot-scope='scope'>
                                <el-button v-if='scope.row.erpfujian&&scope.row.erpfujian!=""' size='small'>查看</el-button>
                                <el-upload v-else
                                  class="upload-demo"
                                  action="https://jsonplaceholder.typicode.com/posts/"
                                  :on-preview="handlePreview"
                                  :on-remove="handleRemove">
                                  <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload> 
                            </template>
                        </el-table-column>         
                    </el-table>
                    <el-pagination class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="clientsSizeChange" @current-change="clientsCurrentChange" :page-size="clients_pagesize" :total="clients_total"></el-pagination>
                </el-row>
                
            </el-tab-pane>
        </el-tabs>
        <el-row>
            <el-dialog size="tiny" title="协议列表" v-model="dialogDisable" @close="cancelAddClient('add_form')" :close-on-click-modal="false">
                <el-form :model="add_form" :rules="rules" ref="add_form" label-width="120px">
                    <el-form-item label='1.付款确认书'>
                        <el-button size='small' type='primary'>查看</el-button>
                        <el-button size='small' type='primary'>签订</el-button>
                    </el-form-item>
                    <el-form-item label='2.付款确认书'>
                        <el-button size='small' type='primary'>查看</el-button>
                        <el-button size='small' type='primary'>签订</el-button>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary">确认融资</el-button>
                    <el-button @click="cancelAddClient('add_form')">取 消</el-button>
                </div>
            </el-dialog>
        </el-row>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                currentCompany:'',
                propertyStatus:{},
                activeName:'first',
                clients_pagesize:10,
                dialog_add_client:false,
                clients_total:100,
                add_form:{},
                dialogDisable:false,
                dialogDisable2:false,
                rules:{},
                companyList:[
                    {
                        label:'深圳xx公司',
                        value:'0',
                    },
                    {
                        label:'深圳开胃公司',
                        value:'1',
                    }
                ],
                propertyList:[
                    {
                        company:'深圳宝宝公司',
                        supplier:'大疆集团',
                        fpno:'fp001',
                        fpsum:'4000.00',
                        fpdate:'2017-10-17',
                        fpfujian:'123',
                        danjuhao:'dj1451',
                        danjufujian:'',
                        erp:'',
                        erpfujian:'',
                        status:'1'
                    },
                    {
                        company:'深圳宝宝公司',
                        supplier:'大疆集团',
                        fpno:'fp001',
                        fpsum:'4000.00',
                        fpdate:'2017-10-17',
                        fpfujian:'',
                        danjuhao:'dj1451',
                        danjufujian:'',
                        erp:'',
                        erpfujian:'',
                        status:'1'
                    },
                    {
                        company:'深圳宝宝公司',
                        supplier:'大疆集团',
                        fpno:'fp001',
                        fpsum:'4000.00',
                        fpdate:'2017-10-17',
                        fpfujian:'',
                        danjuhao:'dj1451',
                        danjufujian:'',
                        erp:'',
                        erpfujian:'',
                        status:'2'
                    },
                    {
                        company:'深圳宝宝公司',
                        supplier:'大疆集团',
                        fpno:'fp001',
                        fpsum:'4000.00',
                        fpdate:'2017-10-17',
                        fpfujian:'',
                        danjuhao:'dj1451',
                        danjufujian:'',
                        erp:'',
                        erpfujian:'',
                        status:'2'
                    },
                    {
                        company:'深圳宝宝公司',
                        supplier:'大疆集团',
                        fpno:'fp001',
                        fpsum:'4000.00',
                        fpdate:'2017-10-17',
                        fpfujian:'',
                        danjuhao:'dj1451',
                        danjufujian:'',
                        erp:'',
                        erpfujian:'',
                        status:'3'
                    },
                    {
                        company:'深圳宝宝公司',
                        supplier:'大疆集团',
                        fpno:'fp001',
                        fpsum:'4000.00',
                        fpdate:'2017-10-17',
                        fpfujian:'',
                        danjuhao:'dj1451',
                        danjufujian:'',
                        erp:'',
                        erpfujian:'',
                        status:'2'
                    },
                    {
                        company:'深圳宝宝公司',
                        supplier:'大疆集团',
                        fpno:'fp001',
                        fpsum:'4000.00',
                        fpdate:'2017-10-17',
                        fpfujian:'',
                        danjuhao:'dj1451',
                        danjufujian:'',
                        erp:'',
                        erpfujian:'',
                        status:'3'
                    },
                    {
                        company:'深圳宝宝公司',
                        supplier:'大疆集团',
                        fpno:'fp001',
                        fpsum:'4000.00',
                        fpdate:'2017-10-17',
                        fpfujian:'',
                        danjuhao:'dj1451',
                        danjufujian:'',
                        erp:'',
                        erpfujian:'',
                        status:'1'
                    },
                    {
                        company:'深圳宝宝公司',
                        supplier:'大疆集团',
                        fpno:'fp001',
                        fpsum:'4000.00',
                        fpdate:'2017-10-17',
                        fpfujian:'',
                        danjuhao:'dj1451',
                        danjufujian:'',
                        erp:'',
                        erpfujian:'',
                        status:'1'
                    },
                ]
            }
        },
        methods: {
            clientsSizeChange(){

            },
            clientsCurrentChange(){

            },
            supply(type){
                this.dialogDisable = true;
            },
            cancelAddClient(){
                this.dialogDisable = false;
            },
            handleClick(){

            },
            handlePreview(){},
            handleRemove(){}
        },
        watch: {
            
        },
        mounted() {
            this.propertyStatus = STATUS.propertyStatus;
            console.log('config:',STATUS)
        },
        computed: {
            
        },
        components:{
           
        }
    }
</script>