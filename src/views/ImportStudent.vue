<template>
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="16" :offset="4">
                        <el-steps :active="active" align-center simple>
                            <el-step title="上传excel文件" icon="el-icon-upload"></el-step>
                            <el-step title="确认数据信息" icon="el-icon-edit"></el-step>
                            <el-step title="导入成功" icon="el-icon-circle-check"></el-step>
                        </el-steps>
                        <!--
                        <el-steps :active="active" align-center>
                            <el-step title="步骤1" description="上传学生excel文件"></el-step>
                            <el-step title="步骤2" description="确认数据信息"></el-step>
                            <el-step title="步骤3" description="导入成功"></el-step>
                        </el-steps>-->
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <el-row>
                    <el-col v-if="active==1" :span="16" :offset="5">
                        <choose-students-excel :nextActive="next" :setExcelData="setExcelData"></choose-students-excel>
                    </el-col>
                    <el-col v-else-if="active==2">
                        <set-course-info :nextActive="next" :getExcelFile="getExcelFile"></set-course-info>
                    </el-col>
                    <el-col v-else-if="active==3" style="text-align: center">
                        <h1>SUCCESS</h1>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
</template>
<script>
    import ChooseStudentsExcel from "@/views/ChooseStudentsExcel";
    import SetCourseInfo from "@/views/SetCourseInfo";
    export default {
        name: "ImportStudent.vue",
        components:{
            SetCourseInfo,
            ChooseStudentsExcel
        },
        data() {
            return {
                active: 1,
                nextStatus: false,   /* 按钮的点击状态*/
            };
        },
        methods: {
            next() {
                if (this.active++ > 2){
                    this.nextStatus = true
                    this.$message('success')
                }
            },
            setExcelData(data){
                this.excelFile = data;
            },
            getExcelFile(){
                return this.excelFile;
            }
        }
    }
</script>

<style scoped>

</style>