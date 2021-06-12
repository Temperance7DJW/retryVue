<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="12" :offset="6">
                    <el-container class="login-type">
                        <el-header style="text-align:center;line-height:60px;font-weight:bold">登 录</el-header>
                        <el-divider class="divider-type"></el-divider>
                      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding-right:10%">
                        <el-form-item label="用户身份" prop="type">
                            <!--
                            <el-select :disabled="submitButton" v-model="ruleForm.type" placeholder="选择用户类型">
                                <el-option label="学生" value="student"></el-option>
                                <el-option label="教师" value="teacher"></el-option>
                            </el-select>-->
                            <el-radio-group v-model="ruleForm.type">
                                <el-radio label="学生"></el-radio>
                                <el-radio label="导师"></el-radio>
                                <el-radio label="主任"></el-radio>
                                <el-radio label="超级管理员"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="用户名" prop="schoolNumber">
                            <el-input :disabled="submitButton" v-model="ruleForm.schoolNumber" placeholder="请输入学工号"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input :disabled="submitButton" type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button :disabled="submitButton" type="primary" @click="submitForm('ruleForm')">登陆</el-button>
                            <el-button :disabled="submitButton" @click="resetForm('ruleForm')" class="el-icon-refresh-left" style="border:none"></el-button>
                        </el-form-item>
                    </el-form>
                    </el-container>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import axios from '@/axios'
    import Cookies from 'js-cookie'
    export default {
        name: "Login.vue",
        data() {
            return {
                ruleForm: {
                    schoolNumber: '',
                    type: '',
                    password: ''
                },
                submitButton: false,
                rules: {
                    schoolNumber: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { len: 10, message: '用户名长度为10', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请输选择身份', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url = 'login';
                        axios.post(url,{
                            "schoolNumber":this.ruleForm.schoolNumber,
                            "type":this.ruleForm.type,
                            "password":this.ruleForm.password,
                        }).then(resp => {
                            let data = resp.data;
                            if(data.requestflag){
                                this.submitButton = true;
                                Cookies.set('type',this.ruleForm.type);
                                Cookies.set('currentUser',this.ruleForm.schoolNumber);
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
            }
        }
    }
</script>
<style scoped>
.login-type {
    border:1px solid #eee;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.divider-type{
    margin-top: 0;
}
</style>