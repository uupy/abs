<template>
	<div class="vs-box host-box">
	    <h4 class="vs-box-header">
	        <span class="title">磁盘信息</span>
	    </h4>
	    <div class="vs-box-body" v-if="!isError && disks">
	        <el-col :span="(disks.length > 6 ? 16 : 8)" :style="(disks.length > 6 ? ('padding:0;') : '')" class="vs-icon-box disks-box">
	            <ul class="disks-list">
	                <li v-for="item in disks" :class="{'active':item.isCur}" @click="tabDisk(item,disks)">
	                    <el-tooltip class="item" effect="light" :content="'磁盘：'+item.Path" placement="top">
	                        <div>
	                            <i v-if="item.Type == 'HDD'" class="im-icon-HDD"></i>
	                            <i v-else-if="item.Type == 'SSD'" class="im-icon-SSD"></i>
	                            <i v-else></i>
	                        </div>
	                    </el-tooltip>
	                </li>
	            </ul>
	        </el-col>
	        <el-col :span="(disks.length > 6 ? 8 : 16)">
	            <el-row class="host-box-inner1">
	                <el-col :span="(disks.length > 6 ? 24 : 12)">
	                    <p>
	                        <label>设备：</label>
	                        <span>{{curDisk.Path}}</span>
	                    </p>
	                    <p>
	                        <label>类型：</label>
	                        <span>{{curDisk.Type}}</span>
	                    </p>
	                </el-col>
	                <el-col :span="(disks.length > 6 ? 24 : 12)">
	                    <p>
	                        <label>容量(G)：</label>
	                        <span>{{curDisk.Total}}</span>
	                    </p>
	                    <p>
	                        <label>状态：</label>
	                        <span>{{curDisk.Status}}</span>
	                    </p>
	                </el-col>
	            </el-row>
	        </el-col>
	    </div>
	    <div class="vs-box-body empty-box" v-else>
	        <p>
	            暂无磁盘信息
	        </p>
	    </div>
	</div>
</template>
<script>
	import { mapGetters , mapActions } from 'vuex'
	export default {
		data(){
			return{
				
			}
		},
		props:{
			disks:{
				type:Array,
				default:function(){
					return []
				}
			},
			isError:{
				type:Boolean,
				default:false
			}
		},
		mounted(){
			
		},
		watch:{
			//注意不能使用箭头函数
		},
		methods:{
			//切换磁盘
			tabDisk(item,disks){
			    const self = this;
			    if(item.isCur){return}
			    disks.forEach((item)=>{
			        item.isCur = false;
			    });
			    item.isCur = true;
			    self.setState({
			    	attr:'curDisk',
			    	val:item
			    });
			    sessionStorage.setItem('curdisk',item.Path);
			},
			...mapActions([
			    'setState'
			])
		},
		computed:{
			...mapGetters([
			    'curDisk'
			])
		}
	}
</script>