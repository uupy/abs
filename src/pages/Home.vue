<template>
	<el-row class="panel">
		<el-col :span="24" class="panel-top">
			<el-col class="leftbar">
				<span class="logo-txt"><i>LO</i>GO</span>
			</el-col>
			<el-col class="rightbar">
				<el-dropdown trigger="click">
					<span class="el-dropdown-link">
						<i class="im-icon-user1"></i>
						{{username || ''}}
						<i class="el-icon-caret-bottom el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="dialogFormVisible = true"><i class="im-icon-edit dropdown-icon"></i>修改密码</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout"><i class="im-icon-logout dropdown-icon"></i>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="panel-center">
			<aside class="panel-aside">
				<div id="panel-aside" class="optiscroll">
					<el-menu :default-active="$route.path" class="el-menu-vertical-demo" :unique-opened="false" router>
						<template v-for="(item,index) in $router.options.routes" v-if="isroot ? (!item.hidden&&!item.isuser) : (!item.hidden&&!item.isroot)">
							<el-submenu :index="index+''" v-if="!item.leaf">
								<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
								<el-menu-item v-for="(child,idx) in item.children" :index="child.path" v-if="isroot ? !child.hidden : (!child.hidden && !child.isroot)" :key="idx">{{child.name}}</el-menu-item>
							</el-submenu>
							<el-menu-item v-if="item.leaf && item.children.length > 0" :index="item.children[0].path">
								<i :class="item.iconCls"></i>{{item.children[0].name}}
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
        <el-dialog size="tiny" title="修改密码" v-model="dialogFormVisible" @close="cancelReset('resetPwdForm')">
            <el-form :model="resetPwdForm" :rules="rules"  ref="resetPwdForm">
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input type="password" v-model="resetPwdForm.oldPassword" auto-complete="off" placeholder="请输入旧密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" v-model="resetPwdForm.newPassword" auto-complete="off" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
					<el-input type="password" v-model="resetPwdForm.confirmPassword" auto-complete="off" placeholder="请再次输入新密码"  @keyup.13="resetPassword('resetPwdForm',resetPwdForm)"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="resetPassword('resetPwdForm',resetPwdForm)">确 定</el-button>
                <el-button @click="cancelReset('resetPwdForm')">取 消</el-button>
            </div>
            <vs-loading :isShow="innerLoading" className="vs-inner-loading"></vs-loading>
        </el-dialog>
        <vs-loading :isShow="onLoading"></vs-loading>
	</el-row>
</template>
<script>
	import Optiscroll from 'optiscroll'
	import Common from './../mixins/common.js'
	import TestPassword from './../mixins/test/password.js'
	export default {
		data() {
			return {
				dialogFormVisible:false,
				handlerCloseWs:false,
				resetPwdForm:{
					oldPassword:'',
					newPassword:'',
					confirmPassword:''
				},
				rules:{
					oldPassword:[
						{ required: true,validator:this.testPassword('旧密码'), trigger: 'change' }
					],
					newPassword:[
						{ required: true, validator:this.testPassword('新密码'), trigger: 'change' }
					],
					confirmPassword:[
						{ required: true, validator:this.testPassword('确认密码'), trigger: 'change' }
					]
				},
				version:'',
				tipstimer:null,
				panelSideScroll:null,
				panelCenterScroll:null,
				wsCount:0
			}
		},
		mixins:[Common,TestPassword],
		methods: {
			// 退出登录
			logout () {
				const self = this;
				self.$confirm('确认退出吗?', '提示').then(() => {
					sessionStorage.clear();
					self.handlerCloseWs = true;
					self.closeSocket();
					self.$router.push('/login');
				}).catch(() => {});
			},
			// 修改密码
			resetPassword(formName,resetPwdForm){
				const self = this;
				self.$refs[formName].validate((valid)=>{
					if(!valid){return false}
					if(resetPwdForm.newPassword !== resetPwdForm.confirmPassword){
						self.$message({
						    message: '新密码与确认密码不一致！',
						    type: 'error'
						});
					}else{
						self.setState({
						    attr:'innerLoading',
						    val:true
						});
						self.onHttp({
							method:'POST',
                            path:'/user/moidfypassword',
                            params:{
                                username:self.username,
                                oldpassword:MD5(resetPwdForm.oldPassword),
                                newpassword:MD5(resetPwdForm.newPassword)
                            }
                        },(response)=>{
                        	self.setState({
                        	    attr:'innerLoading',
                        	    val:false
                        	});
                            if(response.ecode == 0){
								self.dialogFormVisible = false;
                                self.$message({
                                    message: '密码修改成功！',
                                    type: 'success'
                                });
                                setTimeout(()=>{
	                                self.$confirm('重新登录?', '提示').then(() => {
	                                	self.$router.push('/login');
	                                }).catch(() => {});
                                },30)
                            }else{
                                self.$message({
                                    message: response.message,
                                    type: 'error'
                                });
                            }
                        });
					}
				});
			},
			// 取消修改密码
			cancelReset(formName){
				const self = this;
				self.$refs[formName].resetFields();
				self.dialogFormVisible = false;
			},
			// 获取websocket连接
			getSocket(){
				const self = this;
				//获得消息事件
				if(typeof(WebSocket) == "undefined") {
					self.$alert('您使用的浏览器版不支持WebSocket，请更新您的浏览器，以免影响部分功能的使用！（建议使用谷歌或者火狐浏览器浏览）', '提示', {
	                    confirmButtonText: '确定',
	                    type:'info',
	                    callback: action => {}
	                });
				}else{
					self.createSocket();
					//打开事件
					self.socket.onopen = function() {
						self.socket.send(JSON.stringify({token:self.token}));
					}
					self.socketMessage();
					self.socket.onerror = function(){
						self.$message({
							message: 'websocket error',
							type: 'error'
						});
					}
					self.socket.onclose = function(){
						self.updateCluster();
						if(!self.handlerCloseWs && !self.isTimeOut && !self.isKickedOut && self.wsCount < 10000){
							self.wsCount ++;
							self.getSocket();
						}
						console.log('websocket close');
					}
				}
			},
			// websocket通信处理
			socketMessage(){
				const self = this;
				self.socket.onmessage = function(msg) {
					const res = JSON.parse(msg.data);
					if (res.ecode == 0) {
						const type = res.type;
						const data = res.data;
						//type==1为登录，type==2为告警消息推送 type==3重复登录
						if(type == 2){
							let info = '发生{0}节点：{1}，描述：{2}'.format((data.Type == 1 ? '故障' : '事件'),data.Addr,data.Description);
							let level = data.Level == 1 ? 'emergency' : (data.Level == 2 ? 'significance' : (data.Level == 3 ? 'secondary' : (data.Level == 4 ? 'prompt' : 'prompt')));
							self.$toast(info,{
								title:data.Name || '',
								level:level,
								callback:function(){
									self.$router.push({ path: '/pages/logs'});
								}
							});
						}else if(type == 3){
							sessionStorage.clear();
							self.setState({
								attr:'isKickedOut',
								val:true
							});
							self.closeSocket();
							self.$confirm('该账号已在其他地方登录！','提示',{
							    confirmButtonText: '确定',
							    closeOnClickModal:false,
							    showCancelButton:false,
							    type: 'warning',
							    callback:function(){
							    	self.setState({
							    		attr:'isKickedOut',
							    		val:false
							    	});
							        self.$router.push('/login');
							    }
							});
						}else if(type == 5){
							self.$message({
								message: 'Master切换，3s后自动刷新页面',
								type: 'warning'
							});
							self.tipstimer = setTimeout(function(){
								clearInterval(self.tipstimer);
								window.location.reload();
							},3000);
						}
					}else if(res.ecode == 9401 || res.ecode == 9402){
						self.closeSocket();
					} else {
						self.$message({
							message: res.message,
							type: 'error'
						});
					}
				}
			},
			enterKeyup(e){
                const self = this;
                const ev = e || window.event;
                if(ev.keyCode == 13 && self.dialogFormVisible){
                    self.resetPassword('resetPwdForm',self.resetPwdForm);
                }
            }
		},
		mounted() {
			const self = this;
			// self.getSocket();
			self.$nextTick(()=>{
				setTimeout(function(){
					const oSide = document.querySelector('#panel-aside');
					const oPanelCenter = document.querySelector('#panel-c-scroll');
					oSide ? self.panelSideScroll = new Optiscroll(oSide) : '';
	                oPanelCenter ? self.panelCenterScroll = new Optiscroll(oPanelCenter) : '';
				},10)
			});
			document.addEventListener("keyup", self.enterKeyup, false);
		},
		destroyed() {
            const self = this;
            document.removeEventListener("keyup", self.enterKeyup, false);
            self.wsCount = 0;
            self.setState({
            	attr:'socket',
            	val:null
            });
            if(self.panelSideScroll !== null){
            	self.panelSideScroll.destroy();
            }
            if(self.panelCenterScroll !== null){
            	self.panelCenterScroll.destroy();
            }
        }
	}
</script>