<template>
    <el-row>
        <el-col :span="8" :offset="3">
            <el-tag type="success">选课详细信息</el-tag>
            <el-table
                    :data="tableStudents.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="schoolNumber"
                        label="学号"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="class"
                        label="班级"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="handleRemove(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination
                        layout="prev, pager, next"
                        :total="tableStudents.length"
                        @current-change="currentChange">
                </el-pagination>
            </div>
        </el-col>
        <el-col :span="8" :offset="1">
            <el-tag type="info">所有课程信息</el-tag>
            <el-table
                    :data="tableCourses.slice((currentPageC-1)*pageSizeC,currentPageC*pageSizeC)"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="名称"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="teacher.schoolNumber"
                        label="教师学号"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="teacher.name"
                        label="教师姓名"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="totalScore"
                        label="总学分"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="courseId"
                        label="课程编号"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="weight"
                        label="课程权重"
                        width="100">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleEditC(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="handleRemoveC(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                        layout="prev, pager, next"
                        :total="tableCourses.length"
                        @current-change="currentChangeC">
                </el-pagination>
            </div>

            <el-form :model="student" ref="student" label-width="100px">
                <el-form-item label="姓名">
                    <el-input :disabled="!addStudent" v-model="student.name"></el-input>
                </el-form-item>
                <el-form-item label="班级">
                    <el-input v-model="student.class"></el-input>
                </el-form-item>
                <el-form-item v-if="addStudent" label="学号" prop="school_number">
                    <el-input v-model="student.schoolNumber"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="addStudent" type="primary" @click="doAddStudent">添加学生</el-button>
                    <el-button v-else type="primary" @click="returnAdd">返回添加</el-button>
                </el-form-item>
            </el-form>

            <el-form :model="course" ref="student" label-width="100px">
                <el-form-item label="课程名">
                    <el-input v-model="course.name"></el-input>
                </el-form-item>
                <el-form-item label="权重">
                    <el-input v-model="course.weight"></el-input>
                </el-form-item>
                <el-form-item label="总学分">
                    <el-input v-model="course.totalScore"></el-input>
                </el-form-item>
                <el-form-item v-if="addCourse" label="教师">
                    <el-select v-model="teacher.id">
                        <el-option v-for="(t,i) in teachers" :label="t.name" :key="i" :value="t.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="addCourse" type="primary" @click="doAddCourse">添加课程</el-button>
                    <el-button v-else type="primary" @click="returnAddC">返回添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import axios from "@/axios";

    export default {
        name: "ListCourses",
        data: ()=>({
            teachers: [],
            tableCourses:[],
            tableStudents:[],
            student: {},
            addStudent:true,
            course:{
                id:'',
                name:'',
                weight:'',
                totalScore:''
            },
            teacher:{
                id:''},
            addCourse:true,
            pageSize: 10,
            pageSizeC: 3,
            currentPageC: 1,
            currentPage: 1,
        }),
        mounted(){
            let url = 'listCourses';
            axios.get(url).then(resp=>{
                let data = resp.data;
                if(data.requestflag){
                    this.tableCourses = data.data;
                    console.log(this.tableCourses)
                }
            }).catch(err=>{
                this.$message(err)
            });

            url = 'listTeachers';
            axios.get(url).then(resp=>{
                let data = resp.data;
                if(data.requestflag){
                    this.teachers = data.data;
                    console.log(this.teachers)
                }
            }).catch(err=>{
                this.$message(err)
            })
        },
        methods:{
            currentChangeC(currentPage){
                this.currentPageC = currentPage;
            },
            currentChange(currentPage){
                this.currentPage = currentPage;
            },
            handleEditC(row) {
                this.addCourse = false;
                this.course = row;
                let id = row.id;
                this.course = row;
                axios.get(`getCourseStudents/${id}`)
                .then(resp=>{
                    this.tableStudents = resp.data.data;
                })
                .catch(err=>{
                    this.$message('err:'+err)
                })
            },
            handleEdit(row) {
                console.log(row);
                this.addStudent = false;
                this.student = row;
            },
            handleRemoveC(row){
                let id = row.id;
                for (let i = 0;i< this.tableCourses.length;i ++){
                    if(this.tableCourses[i].id == id) {
                        this.tableCourses.splice(i,1);
                        break;
                    }
                }

                axios.get(`deleteCourse/${id}`)
                    .then(resp=>{
                        let data = resp.data;
                        if(data.requestflag){
                            this.$message(data.message)
                        }
                    })
                    .catch(err=>{
                        this.$message('err:'+err)
                    })

            },
            handleRemove(row){
                let schoolNumber = row.schoolNumber
                for (let i = 0;i< this.tableStudents.length;i ++){
                    if(this.tableStudents[i].schoolNumber == schoolNumber) {
                        this.tableStudents.splice(i,1);
                        axios.post('deleteCourseStudent',{
                            "course":{
                                "id":this.course.id
                            },
                            "student":{
                                "schoolNumber": schoolNumber
                            }
                        }).then(resp=>{
                            let data = resp.data;
                            if(data.requestflag){
                                this.$message(data.message)
                            }else {
                                this.$message('err:'+data.message)
                            }
                        }).catch(err=>{
                            this.$message(err)
                        });
                        break;
                    }
                }
            },
            returnAddC(){
                this.addCourse = true;
                if(this.course.name != '' && this.course.weight != '' && this.course.totalScore != ''){
                    axios.post(`updateCourse`,{
                        "id":this.course.id,
                        "name":this.course.name,
                        "weight":this.course.weight,
                        "totalScore":this.course.totalScore
                    })
                        .then(resp=>{
                            let data = resp.data;
                            if(data.requestflag){
                                this.$message(data.message)
                            }
                        })
                        .catch(err=>{
                            this.$message('err:'+err)
                        })
                }
                this.course = {
                    id:'',
                    name:'',
                    weight:'',
                    totalScore:''
                };

                this.teacher.id = ''
            },
            returnAdd(){
                this.addStudent = true;
                if(this.student.name != '' && this.student.schoolNumber != ''){
                    axios.post(`updateCourseStudent`,{
                        "course":{
                            "id":this.course.id
                        },
                        "student":{
                            "schoolNumber":this.student.schoolNumber,
                            "score":this.student.score,
                        }
                    })
                        .then(resp=>{
                            let data = resp.data;
                            if(data.requestflag){
                                this.$message(data.message)
                            }
                        })
                        .catch(err=>{
                            this.$message('err:'+err)
                        })
                }
                this.student = {
                    name:'',
                    schoolNumber: ''
                }
            },
            doAddStudent(){
                if(this.student.name.trim() == ''){
                    this.$message('学生姓名为空')
                    return;
                }
                for (let i = 0;i< this.tableStudents.length;i ++){
                    if(this.tableStudents[i].schoolNumber == this.student.schoolNumber) {
                        this.$message('学号以存在');
                        return;
                    }
                }
                this.tableStudents.push(this.student);
                axios.post('addCourseStudent',{
                    "course":{
                        "id":this.course.id
                    },
                    "student": {
                        "name": this.student.name,
                        "schoolNumber": this.student.schoolNumber,
                        "score": this.student.score,
                    }
                }).then(resp=>{
                    let data = resp.data;
                    if(data.requestflag){
                        this.$message(data.message)
                    }
                }).catch(err=>{
                    this.$message(err)
                });
                this.student = {
                    name:'',
                    schoolNumber: ''
                };
            },
            doAddCourse(){
                if(this.course.name.trim() == ''){
                    this.$message('课程名为空')
                    return;
                }
                for (let i = 0;i< this.tableCourses.length;i ++){
                    if(this.tableCourses[i].id == this.course.id) {
                        this.$message('课程以存在');
                        return;
                    }
                }
                this.tableCourses.push(this.course);
                axios.post('addCourse',{
                        "id":this.course.id,
                        "name":this.course.name,
                        "weight":this.course.weight,
                        "totalScore":this.course.totalScore,
                        "teacher": {
                            "id": this.teacher.id
                        }
                }).then(resp=>{
                    let data = resp.data;
                    if(data.requestflag){
                        this.$message(data.message)
                    }
                }).catch(err=>{
                    this.$message(err)
                });

                this.course = {
                    id:'',
                    name:'',
                    weight:'',
                    totalScore:'',
                };
                this.teacher.id = ''
            }
        }
    }
</script>

<style scoped>

</style>