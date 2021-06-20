<template>
    <el-container>
        <!--
        <el-upload 
            class="upload-demo" 
            list-type="file"
            :on-change="preSubmit" 
            drag 
            multiple 
            action="https://jsonplaceholder.typicode.com/posts/" 
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传xlsx文件</div>
        </el-upload>
        <el-button type="primary" :disabled="submitdisable" @click="handleSubmit()">确认上传</el-button>
        -->
        <el-row>
            <el-col style="margin-bottom: 5%">
                <input type="file" @change="preSubmit">
            </el-col>
            <el-col>
                <el-button type="primary" :disabled="submitdisable" @click="handleSubmit()">确认上传</el-button>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    import xlsx from 'xlsx';
    //import axios from '@/axios'
    export default {
        name: "ChooseStudentsExcel.vue",
        props: ['nextActive','setExcelData'],
        data() {
            return {
                excelFile:{},
                submitdisable: true
            };
        },
        methods: {
            //将excel文件数据转换为json对象
            preSubmit(event){
                let file = event.target.files[0];
                let students = [];
                let teacher = {};
                let course = {};
                let reader = new FileReader();
                reader.readAsBinaryString(file);
                reader.onload = event=>{
                    let data = event.target.result;
                    let workbook = xlsx.read(data,{type: "binary"});
                    let sheet = workbook.Sheets[workbook.SheetNames[0]];
                    xlsx.utils.sheet_to_row_object_array(sheet).forEach(r => {
                        let number = parseInt(r.__EMPTY);
                        // eslint-disable-next-line no-undef
                        if(r.__rowNum__ == 1) {
                            teacher.name = r.__EMPTY_3.substring(6,8);
                            teacher.schoolNumber = r.__EMPTY_3.substring(9,19);
                        }
                        if(r.__rowNum__ == 2) {
                            course.courseId = r.__EMPTY_3.substring(6,14);
                            course.totalScore = r.__EMPTY_9.substring(4).trim();
                        }
                        if(!isNaN(number)) {
                            let stu = {
                                schoolNumber: number,
                                name: r.__EMPTY_1,
                                score: r.__EMPTY_9
                            }
                            students.push(stu);
                        }
                    });
                };
                course.name = file.name.substring(0,file.name.length-4);
                this.excelFile.teacher = teacher;
                this.excelFile.course = course;
                this.excelFile.students = students;
                this.submitdisable = false;
            },
            //数据解析
            handleSubmit(){
                this.$message('数据已解析');
                //立刻disable提交按钮
                this.submitdisable = true;

                //提交数据给父组件
                this.nextActive();
                this.setExcelData(this.excelFile);

            }
        }
    }
</script>

<style scoped>

</style>