<template>
            <el-col :offset="4" :span="16">
                <el-table
                    :data="tableStudents.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    stripe
                    style="width:100%">
                    <el-table-column
                        prop="name"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        prop="schoolNumber"
                        label="学号">
                    </el-table-column>
                    <el-table-column
                        prop="class"
                        label="班级">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                             <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                             <el-button @click="handleRemove(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div>
                    <el-pagination
                            layout="prev, pager, next"
                            :total="tableStudents.length"
                            @current-change="currentChange">
                    </el-pagination>
                </div>
                <h1 >手动添加</h1>
                <el-divider class="divider"></el-divider>
                <el-form :inline="true" class="demo-form-inline" :model="student" ref="student">
                    <el-form-item label="姓名" prop="student_name">
                        <el-input v-model="student.name"></el-input>
                    </el-form-item>
                    <el-form-item v-if="addStudent" label="学号" prop="school_number">
                        <el-input v-model="student.schoolNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="班级" prop="class">
                        <el-input v-model="student.class"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-if="addStudent" type="primary" :disabled="submitdisable" @click="doAddStudent">添加</el-button>
                        <el-button v-else type="primary" :disabled="submitdisable" @click="returnAdd">返回添加</el-button>
                    </el-form-item>
                </el-form>
                <el-divider class="divider"></el-divider>
                <el-button type="primary" :disabled="submitdisable" @click="handleSubmit()">确认上传</el-button>
            </el-col>
            
</template>

<script>
    import axios from '@/axios'
    export default {
        name: "SetCourseInfo",
        props: ['nextActive','getExcelFile'],
        data: ()=>({
            addStudent: true,
            excelFile: {},
            teacher:{
                name: '',
                schoolNumber:''
            },
            course:{
                name:'',
                courseId:'',
                totalScore: 0,
                weight: 1
            },
            /* 需要添加的学生*/
            student:{
                name:'',
                schoolNumber:'',
                class:''
            },
            submitdisable:false,
            tableStudents: [],
            currentPage: 1,
            pageSize: 10
        }),
        mounted(){
            this.excelFile = this.getExcelFile();

            //从父组件中获取属性的数据
            this.teacher = this.excelFile.teacher;
            this.course = this.excelFile.course;
            this.tableStudents = this.excelFile.students;
        },
        methods: {
            handleRemove(row){
                let schoolNumber = row.schoolNumber
                for (let i = 0;i< this.tableStudents.length;i ++){
                    if(this.tableStudents[i].schoolNumber == schoolNumber) {
                        this.tableStudents.splice(i,1);
                        break;
                    }
                }
            },
            handleEdit(row) {
                console.log(row);
                this.addStudent = false;
                this.student = row;
            },
            currentChange(currentPage){
                this.currentPage = currentPage;
            },
            //向后端提交数据json
            handleSubmit(){
                /*if (this.excelFile.course.weight == undefined) {
                    this.$message('请设置权重');
                    return
                }*/

                this.nextActive();
                this.$message('正在提交数据');
                //立刻disable提交按钮
                this.submitdisable = true;
                console.log(this.excelFile)
                let url = 'importStudent';
                axios.post(url,{
                    "teacher": this.excelFile.teacher,
                    "course": this.excelFile.course,
                    "students": this.excelFile.students
                }).then(resp => {
                    console.log(resp);
                    let data = resp.data;
                    if(data.requestflag){
                        this.$message(data.message)
                    }else{
                        this.$message('err:'+data.message)
                    }
                }).catch(err => {
                    this.$message(err)
                });
            },
            returnAdd(){
                this.addStudent = true;
                this.student = {
                    name:'',
                    score: 0,
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
                this.student = {
                    name:'',
                    score: 0,
                    schoolNumber: ''
                };
                this.$message('添加学生成功')
            }
        }
    }
</script>

<style scoped>
.divider{
    margin-top: 0;
}
</style>