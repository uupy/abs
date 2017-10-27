export default {
    data(){
        return{}
    },
    methods: {
        //获取企业联系方式
        getEnterpriseMembers(options){
            const self = this;
            self.$nprogress.start();
            self.setState({
                attr:'onLoading',
                val:true
            });
            let params = {
                enterpriseId:options.enterpriseId,
            };
            
            self.onHttp({
                method:'GET',
                path:'/enterprise/findEnterpriseAndEntMemberList',
                params:params
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });

                if(response.code > 0){
                    const data = response.data;
                    if(data){
                        self.contact_form = data.enterprise;
                        self.contact_persons = data.entMemberList;
                        self.enterpriseName = data.enterprise.name;
                    }
                } else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        },

        // 获取企业基本信息
        getEnterpriseBasicInfo(options){
            const self = this;
            self.$nprogress.start();
            self.setState({
                attr:'onLoading',
                val:true
            });
            let params = {
                enterpriseId:options.enterpriseId,
            };
            
            self.onHttp({
                method:'GET',
                path:'/enterprise/basicInformation',
                params:params
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });

                if(response.code > 0){
                    const data = response.data;
                    if(data){
                        self.business_infos = data.entBusinessInfo;
                        self.shareholder_infos = data.entShareholderInfoList;
                        self.main_staffs = data.entMainStaffList;
                        self.branch_offices = data.entBranchOrgList;
                        self.investment = data.entTowardsInvestmentList;
                        self.properties = data.entIntellectualProperty;
                        self.risk_infos = data.entRiskInformation;
                        self.registers = data.entRegistrationInfoList;
                    }
                } else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        },

        // 更新企业基本信息
        updateEnterpriseBasicInfo(options){
            const self = this;
            self.setState({
                attr:'innerLoading',
                val:true
            });

            let params = {
                id:options.id,
                telephone:options.telephone,
                fax:options.fax,
                website:options.website,
                registerAddress:options.registerAddress,
                contactAddress:options.contactAddress,
            }
            
            self.onHttp({
                method:'POST',
                path:'/enterprise/update',
                params:params
            },(response)=>{
                self.setState({
                    attr:'innerLoading',
                    val:false
                });

                if(response.code > 0){
                    self.$message.success('更新成功！');
                    self.cancelEditContact();
                } else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        },

        //获取资料清单
        getMaterialsList(options){
            const self = this;
            self.$nprogress.start();
            self.setState({
                attr:'onLoading',
                val:true
            });
            let params = {
                enterpriseId:options.enterpriseId,
            };
            
            self.onHttp({
                method:'GET',
                path:'/enterprise/materialsList',
                params:params
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });

                if(response.code > 0){
                    const data = response.data;
                    if(data){
                        if(Util.isArray(data.list)){
                            
                        }
                    }
                } else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        },

        //新增企业联系人
        addEnterpriseMember(options){
            const self = this;
            self.setState({
                attr:'innerLoading',
                val:true
            });
            
            self.onHttp({
                method:'POST',
                path:'/entMember/add',
                params:options
            },(response)=>{
                self.setState({
                    attr:'innerLoading',
                    val:false
                });

                if(response.code > 0){
                    self.$message.success('新增成功');
                    self.cancelAddContact();
                } else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        },

        //获取企业账户信息
        getEnterpriseAccountInfo(options){
            const self = this;
            self.$nprogress.start();
            self.setState({
                attr:'onLoading',
                val:true
            });
            
            self.onHttp({
                method:'GET',
                path:'/enterprise/bank/list',
                params:{
                    enterpriseId:options.enterpriseId
                }
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });

                if(response.code > 0){
                    const data = response.data;
                    if(data){
                        
                    }
                } else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        },
    }
}