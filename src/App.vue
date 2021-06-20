<template>
    <el-container>
        <el-header>
            <span>毕业设计管理系统</span>
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
