<template>
    <el-row>
        <el-col :span="8" :offset="6">
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
            </el-table>
            <div class="block">
                <el-pagination
                        layout="prev, pager, next"
                        :total="tableStudents.length"
                        @current-change="currentChange">
                </el-pagination>
            </div>
            <el-button type="primary" @click="stopChoose">停止互选</el-button>
        </el-col>
    </el-row>
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