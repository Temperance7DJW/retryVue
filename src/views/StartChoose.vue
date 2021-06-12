<template>
    <el-row>
        <el-col :span="12" :offset="6">
            <el-form>
                <el-form-item label="参选课程">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedCourses" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="(c,i) in courses" :label="c" :key="i">{{c.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="设置人数">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in 20"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="startChoose">启动互选</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import axios from '@/axios'
    export default {
        name: "StartChoose.vue",
        data: ()=>({
            checkAll: false,
            checkedCourses: [],
            courses: [],
            isIndeterminate: true,
            value: 0
        }),
        mounted(){
            let url = 'listTeacherCourses';
            axios.get(url).then(resp=>{
                let data = resp.data;
                if(data.requestflag){
                    this.courses = data.data;
                }
            }).catch(err=>{
                this.$message(err)
            })
        },
        methods: {
            handleCheckAllChange(val) {
                this.checkedCourses = val ? this.courses : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.courses.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.courses.length;
            },
            startChoose(){
                let url = 'startChoose';
                let arr = [];
                for (let i = 0;i < this.checkedCourses.length;i ++) {
                    arr.push(this.checkedCourses[i].id);
                }
                axios.post(url,{
                    "courses": arr,
                    "number": this.value
                }).then(resp=>{
                    let data = resp.data;
                    if(data.requestflag){
                        this.value = 0;
                        this.checkedCourses = [];
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