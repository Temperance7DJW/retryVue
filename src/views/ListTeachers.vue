<template>
    <el-row>
        <el-col :offset="4" :span="6">
            <el-form :model="teacher" ref="teacher" label-width="100px">
                <el-form-item label="姓名">
                    <el-input v-model="teacher.name"></el-input>
                </el-form-item>
                <el-form-item v-if="addTeacher" label="学号" prop="school_number">
                    <el-input v-model="teacher.schoolNumber"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="addTeacher" type="primary" @click="doAddTeacher">添加教师</el-button>
                    <el-button v-else type="primary" @click="returnAdd">返回添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="8" :offset="1">
            <el-table
                    :data="tableTeachers.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
                        :total="tableTeachers.length"
                        @current-change="currentChange">
                </el-pagination>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import axios from "@/axios";
    export default {
        name: "ListTeachers",
        data: ()=>({
            tableTeachers:[],
            teacher:{
                name: "",
                schoolNumber:""
            },
            pageSize:10,
            currentPage:1,
            addTeacher:true
        }),
        mounted(){
            let url = 'listTeachers';
            axios.get(url).then(resp=>{
                let data = resp.data;
                if(data.requestflag){
                    this.tableTeachers = data.data;
                    console.log(this.tableTeachers);
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
                for (let i = 0;i< this.tableTeachers.length;i ++){
                    if(this.tableTeachers[i].schoolNumber == schoolNumber) {
                        this.tableTeachers.splice(i,1);
                        axios.post('deleteTeacher',{
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
                this.addTeacher = false;
                this.teacher = row;
            },
            doAddTeacher(){
                if(this.teacher.name.trim() == ''){
                    this.$message('教师姓名为空')
                    return;
                }
                for (let i = 0;i< this.tableTeachers.length;i ++){
                    if(this.tableTeachers[i].schoolNumber == this.teacher.schoolNumber) {
                        this.$message('学号以存在');
                        return;
                    }
                }
                this.tableTeachers.push(this.teacher);
                axios.post('addTeacher',{
                    "name":this.teacher.name,
                    "schoolNumber":this.teacher.schoolNumber
                }).then(resp=>{
                    let data = resp.data;
                    if(data.requestflag){
                        this.$message(data.message)
                    }
                }).catch(err=>{
                    this.$message(err)
                });
                this.teacher = {
                    name:'',
                    schoolNumber: ''
                };
            },
            returnAdd(){
                this.addTeacher = true;
                if(this.teacher.name != '' && this.teacher.schoolNumber != ''){
                    axios.post('updateTeacher',{
                        "name":this.teacher.name,
                        "schoolNumber":this.teacher.schoolNumber
                    }).then(resp=>{
                        let data = resp.data;
                        if(data.requestflag){
                            this.$message(data.message)
                        }
                    }).catch(err=>{
                        this.$message(err)
                    });
                }
                this.teacher = {
                    name:'',
                    schoolNumber: ''
                }
            },
        }
    }
</script>

<style scoped>

</style>