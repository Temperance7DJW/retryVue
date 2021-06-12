<template>
    <el-row>
        <el-col :span="12" :offset="6">
            <el-form>
                <el-form-item label="请选择毕业设计项目">
                    <el-checkbox-group
                            v-model="desginSubject"
                            :min="0"
                            :max="1">
                        <el-checkbox v-for="(d,i) in desginSubjects" :label="d" :key="i">{{d.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="请选择教师">
                    <el-select v-model="teacher.id">
                        <el-option v-for="(t,i) in teachers" :label="t.name" :key="i" :value="t.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitChoose">提交选择</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import axios from '@/axios'
    export default {
        name: "Login.vue",
        data: ()=>({
            desginSubject: [],
            desginSubjects: [],
            teachers:[],
            teacher:{
                id:''
            }
        }),
        mounted(){
            let url = 'listDesginSubjects';
            axios.get(url).then(resp=>{
                let data = resp.data;
                if(data.requestflag) {
                    this.desginSubjects = data.data;
                    this.desginSubject.push(this.desginSubjects[0]);
                }
            }).catch(err=>{
                this.$message(err)
            });

            url = 'listChooseOfTeachers';
            axios.get(url).then(resp=>{
                let data = resp.data;
                if(data.requestflag){
                    this.teachers = data.data;
                    this.teacher.id = this.teachers[0].id;
                }
            }).catch(err=>{
                this.$message(err)
            })
        },
        methods: {
            submitChoose(){
                let url = 'chooseTeacher';
                console.log(this.desginSubject.id);
                axios.post(url,{
                    "designId": this.desginSubject[0].id,
                    "teacherId": this.teacher.id
                }).then(resp=>{
                    let data = resp.data;
                    if(data.requestflag) {
                        this.$message(data.message);
                    }
                }).catch(err=>{
                    this.$message(err)
                });
            }
        }
    }
</script>

<style scoped>

</style>