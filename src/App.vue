<template>
    <el-container>
        <el-header>
            <span>毕业设计管理系统</span>
            <!--
            <el-row>
                <el-col :span="12" :offset="6" style="text-align: center">
                    <h1>欢迎来{{currentUser}}到教师学生互选系统</h1>
                </el-col>
            </el-row>
        </el-header>
        <el-header>
            <el-row>
                <el-col :span="12" :offset="6" style="text-align: center">
                    <el-menu :default-active="index" mode="horizontal" @select="handleSelect">
                        <el-submenu index="1">
                            <template slot="title">我的工作台</template>
                            <el-menu-item :disabled="this.loginType != 'teacher'" index="2-1" @click="routeToListStudents">学生管理</el-menu-item>
                            <el-menu-item :disabled="this.loginType != 'teacher'" index="2-2" @click="routeToListTeachers">教师管理</el-menu-item>
                            <el-menu-item :disabled="this.loginType != 'teacher'" index="2-3" @click="routeToListCourses">课程管理</el-menu-item>
                            <el-submenu index="2-4">
                                <template slot="title">其他管理</template>
                                <el-menu-item :disabled="this.loginType != 'teacher'" index="2-4-1" @click="routeToStartChoose">启动互选功能</el-menu-item>
                                <el-menu-item index="2-4-2" @click="routeToResetPassword">修改密码</el-menu-item>
                                <el-menu-item :disabled="this.loginType != 'teacher'" index="2-4-3" @click="routeToViewChoosed">查看学生选中名单</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item :disabled="this.loginType != 'student'" index="2" @click="routeToChooseTeacher">学生选择导师</el-menu-item>
                        <el-menu-item :disabled="this.loginType != 'teacher'" index="3" @click="routeToImportStudent">老师导入学生</el-menu-item>
                        <el-menu-item index="4" @click="routeToLogin">登录</el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>-->
        </el-header>
        <el-main>
            <el-row>
                <router-view></router-view>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import Cookies from 'js-cookie'
export default {
    name: 'App',
    components: {},
    data:()=>({
        index: '4',
        loginType:'',
        currentUser:{
            name: '',
            school_number:'',
        }
    }),
    mounted(){
        this.currentUser = Cookies.get('currentUser');
        this.loginType = Cookies.get('type');
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key+'-------------', keyPath);
            this.index = key
        },
        routeToChooseTeacher(){
            this.$router.push('/ChooseTeacher')
        },
        routeToImportStudent(){
            this.$router.push('/ImportStudent')
        },
        routeToLogin(){
            this.$router.push('Login')
        },
        routeToListStudents(){
            this.$router.push('ListStudents')
        },
        routeToListTeachers(){
            this.$router.push('ListTeachers')
        },
        routeToListCourses(){
            this.$router.push('ListCourses')
        },
        routeToStartChoose(){
            this.$router.push('StartChoose')
        },
        routeToResetPassword(){
            this.$router.push('ResetPassword')
        },
        routeToViewChoosed(){
            this.$router.push('ViewChoosed')
        },
    }
}
</script>

<style scoped>
    a {
        text-decoration: none;
    }
    .router-link-active {
        text-decoration: none;
    }
    .el-header{
        background-color: #409cff;
        color: white;
        line-height: 60px;
    }
</style>
