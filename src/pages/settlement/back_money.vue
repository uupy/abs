<template>
    <section class="panel-main" :style="styles">
        <el-row class="toolbar toolbar-top">
            <div class="f-left">
                <label>回款状态：</label>
                <el-select size="small" v-model="backMoneyStatus" placeholder="请选择" @change="filterList">
                    <el-option v-for="(item,index) in backMoneyStatuses" :label="item.label" :value="item.value" :key="index"></el-option>
                </el-select>
            </div>
            <div class="f-right">
                <el-input size="small" v-model="filterKeyword" placeholder="请输入关键字" icon="circle-cross" @focus="filterOnfocus = true" @blur="filterOnfocus = false" @click="clearFilter"></el-input>
                <el-button size="small" type="primary" @click="filterList"><i class="el-icon-search"></i>查询</el-button>
            </div>
        </el-row>
        <el-row :span="24">
            <el-table :data="list" border ref="multipleTable" :class="[{'empty-table':list.length == 0}]">
                <!-- <el-table-column type="index" label="序号" width="90"></el-table-column> -->
                <el-table-column prop="code" label="回款编号"></el-table-column>
                <el-table-column prop="supplierName" label="供应商名称"></el-table-column>
                <el-table-column prop="rzName" label="入账方"></el-table-column>
                <el-table-column prop="mfName" label="买方名称"></el-table-column>
                <el-table-column prop="contractNo" label="合同编号"></el-table-column>
                <el-table-column prop="documentNo" label="单据号"></el-table-column>
                <el-table-column prop="yfje" align='center' label="应付金额"></el-table-column>
                <el-table-column prop="rzDate" align='center' label="入账日期" width="120"></el-table-column>
                <el-table-column prop="rzje" align='center' label="入账金额"></el-table-column>
                <el-table-column prop="status" align='center' label="回款状态" width="100">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status == 2 ? 'success' : (scope.row.status == 1 ? 'danger': 'default')" close-transition>{{backMoneyStatusTxt[scope.row.status] ? backMoneyStatusTxt[scope.row.status] : '未知'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column inline-template :context="_self" align='center' label="回款凭证" width="140">
                    <span>
                        <el-button size="small">预览</el-button>
                        <el-button size="small">上传</el-button>
                    </span>
                </el-table-column>
            </el-table>
            <el-pagination v-if="pageTotal > 0" class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChange" @current-change="pageCurrentChange" :page-size="pageSize" :total="pageTotal"></el-pagination>
        </el-row>
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    export default {
        data() {
            return {
                filterOnfocus:false,
                filterKeyword:'',
                backMoneyStatusTxt:ABS_STATUS['backMoney'] ? ABS_STATUS['backMoney'] : {},
                backMoneyStatus:0,
                backMoneyStatuses:[
                    {label:'全部',value:0},
                    {label:'未匹配',value:1},
                    {label:'已匹配',value:2},
                ],
                curPage:1,
                pageSize:10,
                pageTotal:2,
                list:[
                    {
                        code:'hk20171026001',
                        supplierName:'供应商1',
                        rzName:'入账方1',
                        mfName:'买方1',
                        contractNo:'ht20171026001',
                        documentNo:'dj20171026001',
                        yfje:'2,000,000',
                        rzDate:'2017-10-26',
                        rzje:'2,000,000',
                        status:1
                    },
                    {
                        code:'hk20171026002',
                        supplierName:'供应商2',
                        rzName:'入账方2',
                        mfName:'买方2',
                        contractNo:'ht20171026002',
                        documentNo:'dj20171026002',
                        yfje:'2,000,000',
                        rzDate:'2017-10-26',
                        rzje:'2,000,000',
                        status:2
                    }
                ]
            } 
        },
        mixins:[Common],
        methods: {
            // 列表当前页改变
            pageCurrentChange(val){
                this.curPage = val;
                
            },
            // 列表条数改变
            pageSizeChange(val){
                this.pageSize = val;
                
            },
            // 过滤列表
            filterList(){
                if(this.curPage === 1){
                    
                }else{
                    this.curPage = 1;
                    
                }
            },
            // 清空查询
            clearFilter(type){
                this.filterKeyword = '';
                
            },
            enterKeyup(e){
                const self = this;
                const ev = e || window.event;
                if(ev.keyCode == 13){
                    if(self.filterOnfocus){
                        self.filterList();
                    }
                }
            }
        },
        mounted() {
            const self = this;
            self.$nextTick(()=>{
                // self.saveStorageState({
                //     attr:'nav_menu_type',
                //     val:4,
                //     type:'number'
                // });
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

