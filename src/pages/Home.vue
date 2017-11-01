<template>
	<el-row class="panel">
		<el-col :span="24" class="panel-top">
			<el-col class="leftbar">
				<img style="display:block;" :src="logoUrl">
			</el-col>
			<el-col class="rightbar">
				<el-dropdown trigger="click">
					<span class="el-dropdown-link">
						<i :class="['iconfont icon-renzheng default',{'health':authenticationStatus === 2}]"></i>
						<span>
							{{username || ''}}
						</span>
						<i class="el-icon-caret-bottom el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="userCenter"><i class="icon-dropdown iconfont icon-renzhengzhongxinweixuanzhong"></i>认证中心</el-dropdown-item>	
						<el-dropdown-item @click.native="dialogFormVisible = true"><i class="icon-dropdown iconfont icon-xiugaimima"></i>修改密码</el-dropdown-item>

						<el-dropdown-item @click.native="logout"><i class="icon-dropdown iconfont icon-tuichudenglu"></i>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="panel-center">
			<aside class="panel-aside">
				<div id="panel-aside" class="optiscroll">
					<el-menu :default-active="currentRoute" class="el-menu-vertical-demo" :unique-opened="false" router>
						<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
							<el-submenu :ref='"menu_"+index' :id='"menu_"+index' :class='openMenu?"is-opened":""' :index="index+''" v-if="!item.leaf && item.show[enterprise_type]">
								<template slot="title"><i :class="'iconfont '+item.iconCls"></i>{{item.name}}</template>
								<el-menu-item :class="[{'is-active':$route.path.indexOf(child.path) !== -1 && $route.path !== child.path}]" v-for="(child,idx) in item.children" :index="child.path" :key="idx" v-if="child.show[enterprise_type] && !child.hidden">{{child.name === '集团管理' ? (enterprise_type === 2 ? child.name : '集团客户管理') : (child.name === '融资客户管理' ? (enterprise_type !== 2 && enterprise_type !== 4 ? child.name : '供应商管理') : (child.name === '应付数据' ? (enterprise_type !== 3 ? child.name : '融资管理') : child.name))}}</el-menu-item>
							</el-submenu>
							<el-menu-item v-if="item.leaf && item.children.length > 0 && item.show[enterprise_type]" :index="item.children[0].path">
								<i :class="'iconfont '+item.iconCls"></i>{{item.children[0].name}}
							</el-menu-item>							
						</template>
					</el-menu>
				</div>
			</aside>
			<div id="panel-c-scroll" class="optiscroll">
				<section class="panel-c-c">
					<!-- <el-row class="location">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index">{{item.name}}</el-breadcrumb-item>
						</el-breadcrumb>
					</el-row> -->
					<router-view></router-view>
				</section>
			</div>
		</el-col>
		<!-- 对话框 -->
        <el-dialog size="tiny" title="修改密码" v-model="dialogFormVisible" @close="cancelReset">
        	<el-tabs v-model="pasewordActiveName" @tab-click="handleClickTab">
        	    <el-tab-pane label="登录密码管理" name="resetLoginPwdForm">
		            <el-form :model="resetLoginPwdForm" :rules="rules" ref="resetLoginPwdForm">
		                <el-form-item label="旧登录密码" prop="oldPassword">
		                    <el-input type="password" v-model="resetLoginPwdForm.oldPassword" auto-complete="off" placeholder="请输入旧密码"></el-input>
		                </el-form-item>
		                <el-form-item label="新登录密码" prop="newPassword">
		                    <el-input type="password" v-model="resetLoginPwdForm.newPassword" auto-complete="off" placeholder="请输入新密码"></el-input>
		                </el-form-item>
		                <el-form-item label="确认登录密码" prop="confirmPassword">
							<el-input type="password" v-model="resetLoginPwdForm.confirmPassword" auto-complete="off" placeholder="请再次输入新密码"></el-input>
		                </el-form-item>
		            </el-form>
        	    </el-tab-pane>
        	    <el-tab-pane label="签约密码管理" name="resetSignPwdForm">
        	    	<el-form :model="resetSignPwdForm" :rules="rules" ref="resetSignPwdForm">
		                <el-form-item label="旧签约密码" prop="oldPassword">
		                    <el-input type="password" v-model="resetSignPwdForm.oldPassword" auto-complete="off" placeholder="请输入旧密码"></el-input>
		                </el-form-item>
		                <el-form-item label="新签约密码" prop="newPassword">
		                    <el-input type="password" v-model="resetSignPwdForm.newPassword" auto-complete="off" placeholder="请输入新密码"></el-input>
		                </el-form-item>
		                <el-form-item label="确认签约密码" prop="confirmPassword">
							<el-input type="password" v-model="resetSignPwdForm.confirmPassword" auto-complete="off" placeholder="请再次输入新密码"></el-input>
		                </el-form-item>
		            </el-form>
        	    </el-tab-pane>
        	</el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="resetPassword">确 定</el-button>
                <el-button @click="cancelReset">取 消</el-button>
            </div>
            <vs-loading :isShow="innerLoading" className="vs-inner-loading"></vs-loading>
        </el-dialog>
        <vs-loading :isShow="onLoading"></vs-loading>
	</el-row>
</template>
<script>
	import Optiscroll from 'optiscroll'
	import Common from '@/mixins/common.js'
	import Test from '@/mixins/test/index.js'
	import Home from '@/api/home.js'
	import logoUrl from '@/assets/images/logo.png'
	export default {
		data() {
			return {
				openMenu:false,
				menuItemStyle:{},
				currentRoute:'',
				dialogFormVisible:false,
				resetLoginPwdForm:{
					oldPassword:'',
					newPassword:'',
					confirmPassword:''
				},
				resetSignPwdForm:{
					oldPassword:'',
					newPassword:'',
					confirmPassword:''
				},
				rules:{
					oldPassword:[
						{ required: true,message:'旧密码不能为空', trigger: 'change' }
					],
					newPassword:[
						{ required: true,validator:this.testPassword('密码'),trigger: 'change' }
					],
					confirmPassword:[
						{ required: true,validator:this.testPassword('密码'), trigger: 'change' }
					]
				},
				panelSideScroll:null,
				panelCenterScroll:null,
				pasewordActiveName:'resetLoginPwdForm',
				logoUrl:logoUrl
			}
		},
		mixins:[Common,Home,Test],
		methods: {
			//取消修改密码
			cancelReset(){
				const self = this;
				self.$refs[self.pasewordActiveName].resetFields();
				self.dialogFormVisible = false;
			},
			handleClickTab(){
				const self = this;
				self.$refs[self.pasewordActiveName].resetFields();
			},
			resetPassword(){
				const self = this;
				self.$refs[self.pasewordActiveName].validate((valid)=>{
				    if(valid){
				    	if(self.pasewordActiveName == 'resetLoginPwdForm'){
				    		self.resetLoginPassword();
				    	}else{
				    		self.resetSignPassword();
				    	}
				    }
				});
			},
			enterKeyup(e){
                const self = this;
                const ev = e || window.event;
                if(ev.keyCode == 13){
                	if(self.dialogFormVisible && !self.innerLoading){
                		self.resetPassword();
                	}
                }
            },
            userCenter(){
            	this.$router.push({path:'/user-center'})
            }
		},
		mounted() {
			const self = this;
			self.currentRoute = self.$route.path;
			if(self.$route.matched.length>=3){
				self.currentRoute = self.$route.matched[1].path;
			}
			self.$nextTick(()=>{
				self.updateOperateAuthority();
				self.$router.beforeEach((to,from,next)=>{
					self.updateOperateAuthority();
					next();
				});
				setTimeout(function(){
					const oSide = document.querySelector('#panel-aside');
					const oPanelCenter = document.querySelector('#panel-c-scroll');
					oSide ? self.panelSideScroll = new Optiscroll(oSide) : '';
	                oPanelCenter ? self.panelCenterScroll = new Optiscroll(oPanelCenter) : '';
				},10);
			});
			document.addEventListener("keyup", self.enterKeyup, false);
		},
		destroyed() {
            const self = this;
            document.removeEventListener("keyup", self.enterKeyup, false);
            if(self.panelSideScroll !== null){
            	self.panelSideScroll.destroy();
            }
            if(self.panelCenterScroll !== null){
            	self.panelCenterScroll.destroy();
            }
        }
	}
</script>
<style scoped>
	.icon-renzheng{position: relative;top:2px; margin-right: 0;font-size: 20px;}
</style>