<template>
    <section class="panel-main property-to-confirm" :style="styles"> 
        <el-row class="toolbar toolbar-top">            
            <el-col :span="17">
                <el-col>
                    <label style="display:inline-block;min-width:115px; padding-left:10px;text-align:right;">资产状态：</label>
                    <el-select size="small" v-model="currentStatus" placeholder="请选择" style="width:230px;">
                        <el-option v-for="(item,index) in propertyStatus" :label="item" :value="index" :key="index"></el-option>
                    </el-select>
                    <label style="display:inline-block;min-width:115px; padding-left:10px;text-align:right;">放款日期：</label>
                    <el-date-picker size="small" class='date-picker'
                        v-model="dateRange3"
                        type="daterange"
                        range-separator=' 至 '
                        placeholder="选择日期范围">
                    </el-date-picker>
                </el-col>
                <el-col style="margin-top:10px;">
                    <label style="display:inline-block;min-width:115px; padding-left:10px;text-align:right;">应收账款到期日：</label>
                    <el-date-picker size="small" class='date-picker'
                        v-model="dateRange"
                        type="daterange"
                        range-separator=' 至 '
                        placeholder="选择日期范围">
                    </el-date-picker>
                    <label style="display:inline-block;min-width:115px; padding-left:10px;text-align:right;">资产发行日期：</label>
                    <el-date-picker size="small" class='date-picker'
                        v-model="dateRange2"
                        type="daterange"
                        range-separator=' 至 '
                        placeholder="选择日期范围">
                    </el-date-picker>
                </el-col> 
            </el-col>  
            <div class="f-right" style="padding-top:40px;">
                <el-input size="small" v-model="filter_name" placeholder="请输入关键字" icon="circle-cross" @click="clearFilter"></el-input>
                <el-button size="small" type="primary" ><i class="el-icon-search"></i> 查询</el-button>
                <el-button size="small" type='primary'>导出</el-button>
            </div>       
        </el-row>

        <el-row>
            <el-table
                ref="multipleTable"
                :data="propertyList"
                border
                tooltip-effect="dark"                
                @selection-change="handleSelectionChange">

                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop='pno'  align='center'  label='资产编号'></el-table-column>
                <el-table-column prop='supplier' align='center' label='供应商'></el-table-column>
                <el-table-column prop='project' align='center' label='项目公司'></el-table-column>
                <el-table-column prop='area'  align='center' label='所属区域'></el-table-column>
                <el-table-column prop='yszkje' align='center'  label='应收账款金额'></el-table-column>
                <el-table-column prop='zrzj' align='center'  label='转让折价'></el-table-column>
                <el-table-column prop='tjrq' align='center' label='提交日期'></el-table-column>
                <el-table-column prop='fkrq' align='center' label='放款日期'></el-table-column>
                <el-table-column prop='zcfxrq' align='center' label='资产发行日期'></el-table-column>
                <el-table-column prop='yszkdqr'  align='center' label='应收账款到期日'></el-table-column>
                <el-table-column prop='rzts'  align='center' label='融资天数'></el-table-column>
                <el-table-column prop='hkr'  align='center' label='还款日期'></el-table-column>
                <el-table-column align='center' label='资产状态'>
                    <template slot-scope='scope'>
                        <el-tag :type="scope.row.status == '1' ? 'success' : (scope.row.status == '2' ? 'warning':'default')" close-transition>{{propertyStatus[scope.row.status]}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align='center' label='操作' width='80'>
                    <template slot-scope='scope'>
                        <span class="table-btn health" @click.stop="checkView(row)">详情</span>
                    </template>
                </el-table-column>                
              </el-table>
               <el-pagination class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="clientsSizeChange" @current-change="clientsCurrentChange" :page-size="clients_pagesize" :total="clients_total"></el-pagination>
        </el-row>
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    export default {
        data() {
            return {
                dateRange:'',
                dateRange2:'',
                dateRange3:'',
                currentStatus:'',
                filter_name:'',
                clients_pagesize:10,
                clients_total:1,
                propertyList:[
                    {
                        pno:'ZCA01171019001',
                        area:'碧桂园',
                        supplier:'供应商1',
                        yszkje:'100万',
                        zrzj:'100万',
                        tjrq:'2017-12-30',
                        fkrq:'2017-12-30',
                        yszkdqr:'2017-12-30',
                        zcfxrq:'2017-12-30',
                        hkr:'2017-12-30',
                        rzts:'360',
                        status:'1',
                    }
                ],
                propertyStatus:{},
            }
        },
        methods: {
            clearFilter(){
 
            },
            handleSelectionChange(){
 
            },
            clientsSizeChange(){
 
            },
            clientsCurrentChange(){
 
            },
            checkView(row){
                const self = this;
                self.$router.push({path:'/pages/assets/standing-book/views'});
            },
        },
        watch: {
            
        },
        mixins:[Common],
        mounted() {
            const self = this;
            self.propertyStatus = ABS_STATUS.propertyStatus;
        },
        computed: {
            
        },
        components:{
           
        }
    }
</script>
<style>
    /*.property-to-confirm .date-picker input{width: 400px;font-size: 13px;color: #666;}*/
    .property-to-confirm .toolbar-top .date-picker.el-input{width: 230px;font-size: 13px;color: #666;text-align: center;}
</style>