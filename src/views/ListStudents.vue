<template>
    <el-row>
        <el-col :offset="4" :span="6">
            <el-form :model="student" ref="student" label-width="100px">
                <el-form-item label="姓名" prop="student_name">
                    <el-input v-model="student.name"></el-input>
                </el-form-item>
                <el-form-item v-if="addStudent" label="学号" prop="school_number">
                    <el-input v-model="student.schoolNumber"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="addStudent" type="primary" @click="doAddStudent">添加学生</el-button>
                    <el-button v-else type="primary" @click="returnAdd">返回添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="8" :offset="1">
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
    </el-row>
</template>

<script>
    import axios from '@/axios'
    export default {
        name: "ListStudents.vue",
        data: ()=>({
            tableStudents:[],
            student:{
                name:'',
                schoolNumber:''
            },
            pageSize:10,
            currentPage:1,
            addStudent:true
        }),
        mounted(){
            let url = 'listStudents';
            axios.get(url).then(resp=>{
                let data = resp.data;
                if(data.requestflag){
                    this.tableStudents = data.data;
                }
            }).catch(err=>{
                this.$message(err)
            })
        },
        methods: {
            currentChange(currentPage){
                this.currentPage = currentPage;
            },
            handleRemove(row){
                let schoolNumber = row.schoolNumber
                for (let i = 0;i< this.tableStudents.length;i ++){
                    if(this.tableStudents[i].schoolNumber == schoolNumber) {
                        this.tableStudents.splice(i,1);
                        axios.post('deleteStudent',{
                            "schoolNumber": schoolNumber
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
            handleEdit(row) {
                console.log(row);
                this.addStudent = false;
                this.student = row;
            },
            doAddStudent(){
                if(this.student.name.trim() == '' || this.student.schoolNumber.trim() == ''){
                    this.$message('学生姓名为空')
                    return;
                }
                for (let i = 0;i< this.tableStudents.length;i ++){
                    if(this.tableStudents[i].schoolNumber == this.student.schoolNumber) {
                        this.$message('学号已存在');
                        return;
                    }
                }
                this.tableStudents.push(this.student);
                axios.post('addStudent',{
                    "name":this.student.name,
                    "schoolNumber":this.student.schoolNumber
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
            returnAdd(){
                this.addStudent = true;
                if(this.student.name != '' && this.student.schoolNumber != ''){
                    axios.post('updateStudent',{
                        "name":this.student.name,
                        "schoolNumber":this.student.schoolNumber
                    }).then(resp=>{
                        let data = resp.data;
                        if(data.requestflag){
                            this.$message(data.message)
                        }
                    }).catch(err=>{
                        this.$message(err)
                    });
                }
                this.student = {
                    name:'',
                    schoolNumber: ''
                }
            },
        }
    }
</script>

<style scoped>

</style>