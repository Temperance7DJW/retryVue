<template>
    <el-row>
        <el-col :span="12" :offset="6">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="schoolNumber">
                    <el-input disabled v-model="ruleForm.schoolNumber"></el-input>
                </el-form-item>
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input type="password" v-model="ruleForm.oldPassword" @blur="checkOldPassword" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input :disabled="!inputNewPassword"  type="password" v-model="ruleForm.newPassword" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import axios from "@/axios";

    export default {
        name: "ResetPassword.vue",
        data: ()=>({
            ruleForm: {
                schoolNumber: '',
                oldPassword: '',
                newPassword: ''
            },
            inputNewPassword: false,
            rules: {
                schoolNumber: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { len: 10, message: '用户名长度为10', trigger: 'blur' }
                ],
                oldPassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }),
        mounted(){
            axios.get('getCurrentUser').then(resp=>{
                let data = resp.data;
                if(data.requestflag){
                    this.ruleForm.schoolNumber = data.data.schoolNumber;
                }else{
                    this.$message(data.message)
                }
            }).catch(err=>{this.$message(err)});
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url = 'doResetPassword';
                        axios.post(url,{
                            "schoolNumber":this.ruleForm.schoolNumber,
                            "password":this.ruleForm.newPassword,
                        }).then(resp => {
                            let data = resp.data;
                            if(data.requestflag){
                                this.$message(data.message)
                            }else{
                                this.$message(data.message)
                            }
                        }).catch(err => {
                            this.$message('发生错误'+err)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            checkOldPassword(){
                let url = 'doCheckPassword';
                axios.post(url,{
                    "schoolNumber":this.ruleForm.schoolNumber,
                    "password":this.ruleForm.oldPassword,
                }).then(resp => {
                    let data = resp.data;
                    if(data.requestflag){
                        this.inputNewPassword = true;
                        this.$message(data.message)
                    }else{
                        this.$message(data.message)
                    }
                }).catch(err => {
                    this.$message('发生错误'+err)
                })
            }
        }
    }
</script>

<style scoped>

</style>