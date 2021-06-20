import Vue from 'vue'
import VueRouter from 'vue-router'
import ChooseTeacher from "@/views/ChooseTeacher";
import ImportStudent from "@/views/ImportStudent";
import ViewChoosed from "@/views/ViewChoosed";
import Login from "@/views/Login";
import ListStudents from "@/views/ListStudents";
import ListTeachers from "@/views/ListTeachers";
import ListCourses from "@/views/ListCourses";
//import StartChoose from "@/views/StartChoose";
import ResetPassword from "@/views/ResetPassword";

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
            path:'/ChooseTeacher',//1
            name:ChooseTeacher,
            component: ChooseTeacher
        },
        {
            path:'/ImportStudent',//2
            name:ImportStudent,
            component: ImportStudent
        },
        {
            path:'/ViewChoosed',
            name:ViewChoosed,
            component: ViewChoosed
        },
        {
            path:'/Login',//3
            name:Login,
            component: Login
        },
        {
            path:'/ListStudents',
            name:ListStudents,
            component: ListStudents
        },
        {
            path:'/ListTeachers',
            name:ListTeachers,
            component: ListTeachers
        },
        {
            path:'/ListCourses',
            name: ListCourses,
            component: ListCourses
        },/*
        {
            path:'/StartChoose',
            component: StartChoose,
            name: StartChoose
        },*/
        {
            path:'/ResetPassword',//4
            component:ResetPassword,
            name: ResetPassword
        },
        {
            path:'/',
            redirect: '/Login'
        },
    ]
})