export default {
    data(){
        return{}
    },
    methods: {
        // 获取企业联系方式
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
                        // self.enterpriseName = data.enterprise.name;
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
                        // 工商信息
                        if(data.entBusinessInfo){
                            self.business_infos = [
                                {
                                    label1:'统一社会信用代码',
                                    value1:data.entBusinessInfo.credit_code || '',
                                    label2:'组织机构代码',
                                    value2:data.entBusinessInfo.dept_code || '',
                                    colspan:false
                                },
                                {
                                    label1:'注册号',
                                    value1:data.entBusinessInfo.register_code || '',
                                    label2:'经营状态',
                                    value2:data.entBusinessInfo.operating_status || '',
                                    colspan:false
                                },
                                {
                                    label1:'所属行业',
                                    value1:data.entBusinessInfo.industry || '',
                                    label2:'公司类型',
                                    value2:data.entBusinessInfo.company_type || '',
                                    colspan:false
                                },
                                {
                                    label1:'注册资本',
                                    value1:data.entBusinessInfo.registered_capital || '',
                                    label2:'成立日期',
                                    value2:data.entBusinessInfo.establish_date || '',
                                    colspan:false
                                },
                                {
                                    label1:'营业期限',
                                    value1:data.entBusinessInfo.operating_period || '',
                                    label2:'发照日期',
                                    value2:data.entBusinessInfo.public_date || '',
                                    colspan:false
                                },
                                {
                                    label:'登记机关',
                                    value:data.entBusinessInfo.registration_authority || '',
                                    colspan:true
                                },
                                {
                                    label:'企业地址',
                                    value:data.entBusinessInfo.company_address || '',
                                    colspan:true
                                },
                                {
                                    label:'经营范围',
                                    value:data.entBusinessInfo.business_scope || '',
                                    colspan:true
                                }
                            ]
                        }
                        // 股东信息
                        if(data.entShareholderInfoList){
                            self.shareholder_infos = data.entShareholderInfoList;
                        }
                        // 主要人员
                        if(data.entMainStaffList){
                            self.main_staffs = data.entMainStaffList;
                        }
                        // 分支机构
                        if(data.entBranchOrgList){
                            self.branch_offices = data.entBranchOrgList;
                        }
                        // 对外投资
                        if(data.entTowardsInvestmentList){
                            self.investment = data.entTowardsInvestmentList;
                        }
                        // 知识产权
                        if(data.entIntellectualProperty){
                            self.properties = data.entIntellectualProperty;
                            self.properties = [
                                {label1:'商标',value1:data.entIntellectualProperty.trademark || '',label2:'专利信息',value2:data.entIntellectualProperty.patent_info || '',colspan:false},
                                {label1:'著作权',value1:data.entIntellectualProperty.copyright || '',label2:'软件著作权',value2:data.entIntellectualProperty.software_copyright || '',colspan:false},
                                {label:'域名',value:data.entIntellectualProperty.domain_name || '',colspan:true},
                                {label:'资质认证',value:data.entIntellectualProperty.certification || '',colspan:true},
                            ];
                        }
                        // 风险信息
                        if(data.entRiskInformation){
                            self.risk_infos = data.entRiskInformation;
                        }
                        // 中登网登记信息
                        if(data.entRegistrationInfoList){
                            self.registers = data.entRegistrationInfoList;
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

        // 获取资料清单
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
                        self.data_list = data;
                    }
                } else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        },

        // 新增企业联系人
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

        // 编辑企业联系人
        updateEnterpriseMember(options){
            const self = this;
            self.setState({
                attr:'innerLoading',
                val:true
            });

            self.onHttp({
                method:'POST',
                path:'/entMember/updateEntMember',
                params:options
            },(response)=>{
                self.setState({
                    attr:'innerLoading',
                    val:false
                });

                if(response.code > 0){
                    self.$message.success('编辑成功');
                    self.cancelAddContact();
                } else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        },

        // 删除企业联系人
        deleteEnterpriseMember(row){
            const self = this;
            self.$confirm('操作不可逆，确认删除吗?', '提示', {
                type: 'warning'
            }).then(()=>{
                self.$nprogress.start();
                self.setState({
                    attr:'onLoading',
                    val:true
                });

                self.onHttp({
                    method:'POST',
                    path:'/entMember/deleteMember',
                    params:{
                        enterpriseType:row.id
                    }
                },(response)=>{
                    self.$nprogress.done();
                    self.setState({
                        attr:'onLoading',
                        val:false
                    });

                    if(response.code > 0){
                        self.$message.success(`成功删除联系人${row.name}`);
                        self.getEnterpriseMembers({enterpriseId:(self.enterpriseIdChange?self.enterpriseId:self.enterprise_id)});
                    } else{
                        self.$message({
                            message: response.msg,
                            type: 'error'
                        });
                    }
                });
            }).catch(() => {});
        },

        // 获取企业账户信息
        getEnterpriseAccountInfo(options){
            const self = this;
            self.$nprogress.start();
            self.setState({
                attr:'onLoading',
                val:true
            });
            
            self.onHttp({
                method:'GET',
                path:'/enterprise/bank/account',
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
                        if(data.loanAccountInfo){
                            self.loanAccountInfo = [
                                {label:'户名',value:data.loanAccountInfo.bankAccountName || ''},
                                {label:'开户行',value:data.loanAccountInfo.enterpriseBank || ''},
                                {label:'账号',value:data.loanAccountInfo.enterpriseBankAccount || ''}
                            ]
                        }
                        if(data.settledAccountInfo){
                            self.settledAccountInfo = [
                                {label:'户名',value:data.settledAccountInfo.bankAccountName || ''},
                                {label:'开户行',value:data.settledAccountInfo.enterpriseBank || ''},
                                {label:'账号',value:data.settledAccountInfo.enterpriseBankAccount || ''}
                            ]
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

        // 文件下载
        downLoadFile(params){
            const self = this;
            self.$nprogress.start();
            self.setState({
                attr:'onLoading',
                val:true
            });

            self.onHttp({
                method:'GET',
                path:'/file/downloadAuthenFile',
                fileFlow:true,
                params:params
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });
                var aEle = document.createElement("a");
                // aEle.src = window.URL.createObjectURL(response);
                console.log(aEle)
            });
        }
    }
}