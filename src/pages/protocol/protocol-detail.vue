<template>
    <section class="panel-main">
       <el-row class="toolbar">
            <span class="title" style="font-size:16px;">{{protocol.name}}</span>
        </el-row>
        <el-row>
            <span class="title" style="font-size:16px;">商务合同信息</span>
            <!-- <el-table :data="businessInfo" class="table-list">
                <el-table-column prop="supplier" label="供应商名称"></el-table-column>
                <el-table-column prop="company" label="项目公司"></el-table-column>
                <el-table-column prop="area" label="所属区域"></el-table-column>         
                <el-table-column prop="projectName" label="项目名称"></el-table-column>         
                <el-table-column prop="contractName" label="商务合同名称"></el-table-column>         
                <el-table-column prop="contractNo" label="商务合同编号"></el-table-column>         
                <el-table-column prop="contractType" label="合同类别"></el-table-column>         
            </el-table> -->

            <el-form label-width='120px'>
                <el-form-item label='供应商名称'>{{businessInfo.supplier}}</el-form-item>
                <el-form-item label='项目公司'>{{businessInfo.company}}</el-form-item>
                <el-form-item label='所属区域'>{{businessInfo.area}}</el-form-item>
                <el-form-item label='项目名称'>{{businessInfo.projectName}}</el-form-item>
                <el-form-item label='商务合同名称'>{{businessInfo.contractName}}</el-form-item>
                <el-form-item label='商务合同编号'>{{businessInfo.contractNo}}</el-form-item>
                <el-form-item label='合同类别'>{{businessInfo.contractType}}</el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <span class="title" style="font-size:16px;">资产信息</span>
        </el-row>
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    import Clients from '@/api/clients.js'
    export default {
        data() {
            return {
                protocolId:'',
                protocol:
                {
                    index:'1',
                    id:'pt1001',
                    type:'主合同',
                    name:'协议名称',
                    signatory:'深圳xx公司',
                    sum:'1000万',
                    status:'签约中',   
                    signDate:'2017-10-16',
                    deadline:'2027-10-16'
                },
                businessInfo:{
                    supplier:'深圳xx公司',
                    company:'深圳大唐公司',
                    area:'深圳市宝安区',
                    projectName:'',
                    contractName:'',
                    contractNo:'001',
                    contractType:'工程类',
                }               
            }
        },
        methods: {
           
        },
        watch: {
            
        },
        mixins:[Common,Clients],
        mounted() {
            const self = this;
            console.log('protocolId:',self.$route.params.protocolId)
        },
        computed: {
            
        },
        components:{
           
        }
    }
</script>