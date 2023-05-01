<template>
    <div>
        <v-card>
            <v-card-title>ຂໍ້ມູນຈັດອາຈານສອນຕາມເວລາ</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="3">
                        <v-autocomplete :items="teacherList" item-text="name" item-value="id" dense outlined
                            label="ເລືອກອາຈານສອນ" v-model="form.teacherId"></v-autocomplete>
                    </v-col>
                    <v-col cols="3">
                        <v-select v-model="form.schoolYear" :items="yearList" item-text="name" item-value="id" dense
                            outlined label="ເລືອກສົກຮຽນ" @change="_onGetLevel"></v-select>
                    </v-col>
                    <v-col cols="3">
                        <v-select v-model="form.levelId" :items="levelList" item-text="levelName" item-value="levelId" dense
                            outlined label="ເລືອກຊັ້ນຮຽນ" @change="_onGetClass"></v-select>
                    </v-col>
                    <v-col cols="3">
                        <v-select v-model="form.classId" :items="classList" item-text="name" item-value="id" dense outlined
                            label="ເລືອກຫ້ອງຮຽນ" multiple chips small-chips></v-select>
                    </v-col>
                    <v-col cols="3">
                        <v-select v-model="form.subjectId" :items="subjectList" item-text="name" item-value="id" dense outlined 
                            label="ເລືອກວິຊາຮຽນ" ></v-select>
                    </v-col>
                </v-row>
                <v-btn color="primary" @click="onInser">ບັນທຶກ</v-btn>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            yearList: [],
            levelList: [],
            classList: [],
            teacherList: [],
            subjectList:[],
            form: {
                classId:[]
            }
        }
    },
    mounted() {
        this._onGetYear()
        this.onGetTeacher()
    },
    methods: {
        async _onGetLevel(id) {
            try {
                await this.$axios.$get(`/registration/level-by-school-year/${id}`).then((data) => {
                    this.levelList = data
                    console.log(data)
                })
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error
                })
            }
        },
        async _onGetClass(id) {
            try {
                await this.$axios.$get(`/registration/class-by-level/${id}`).then((data) => {
                    this.classList = data
                    this.onGetSubject()
                })
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error
                })
            }
        },
        async _onGetYear() {
            try {
                await this.$axios.$get('/manage/school-year').then((data) => {
                    console.log("Year", data)
                    this.yearList = data

                })
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error
                })
            }
        },
        async onGetTeacher() {
            try {
                await this.$axios.$get('/teacher', { params: { type: 'teacher' } }).then((data) => {
                    console.log("Teac", data)
                    this.teacherList = data
                })
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error
                })
            }
        },
        async onGetSubject(){
            try {
                await this.$axios.$get(`/manage/subject-by-level`,{params:{levelId: this.form.levelId,schoolYear: this.form.schoolYear}}).then((data) => {
                    this.subjectList = data
                })
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error
                })
            }
        },
        async onInser(){
            try {
                await this.$axios.$post(`/manage/level-class-teacher`,this.form).then((data) => {
                    swal.fire({
                        icon:'success',
                        text:'ສຳເລັດ'
                    })
                })
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error
                })
            }
        }
    }
}
</script>