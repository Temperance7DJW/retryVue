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
            <el-button type="primary" @click="stopChoose">停止互选</el-button>
        </el-col>
</template>

<script>
    import axios from "@/axios";

    export default {
        name: "ViewChoosed.vue",
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
            let url = 'listChoosedStudents';
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
            stopChoose(){
                let url = 'stopChoose';
                axios.get(url).then(resp=>{
                    let data = resp.data;
                    if(data.requestflag){
                        this.$message(data.message);
                    }
                }).catch(err=>{
                    this.$message(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>