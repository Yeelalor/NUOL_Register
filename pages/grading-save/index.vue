<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="3"
          ><v-select
            v-model="form.schoolYear"
            :items="yearList"
            item-text="name"
            item-value="id"
            dense
            outlined
            label="ເລືອກສົກຮຽນ"
            hide-details="auto"
            @change="_onGetclass"
          ></v-select
        ></v-col>
        <v-col cols="3">
          <v-select
            v-model="form.classId"
            :items="class_list"
            item-text="name"
            item-value="id"
            dense
            outlined
            label="ເລືອກຫ້ອງຮຽນ"
            hide-details="auto"
            @change="onGetSubject"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="form.subjectId"
            :items="subjectList"
            item-text="name"
            item-value="id"
            dense
            outlined
            label="ເລືອກວິຊາຮຽນ"
            hide-details="auto"
            @change="_onGetclass"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="form.monthId"
            :items="monthList"
            item-text="name"
            item-value="id"
            dense
            outlined
            label="ເລືອກວິຊາຮຽນ"
            hide-details="auto"
            @change="_onGetclass"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-btn color="primary" @click="onGetStudent">ຄົ້ນຫາ</v-btn>
        </v-col>
      </v-row>
      <v-card max-width="500" flat class="mt-10">
        <v-data-table :headers="student_head" :items="student_list" dense>
          <template #[`item.create`]="{ item }">
            <v-text-field
              dense
              outlined
              v-model="item.score"
              label="ຄະແນນ"
              class="mt-5"
            ></v-text-field>
          </template>
          <template #[`item.name`]="{ item }">
            <span>{{ item.name }} {{ item.surname }}</span>
          </template>
        </v-data-table>
        <div>
          <v-btn color="primary" @click="onSave">ບັນທຶກ</v-btn>
        </div>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
  data() {
    return {
      yearList: [],
      form: {
        monthId: null,
        classId: null,
        levelId: null,
        subjectId: null,
      },
      class_list: [],
      student_head: [
        { text: 'ຊື່ ແລະ ນາມສະກຸນ', value: 'name' },
        { text: 'ປ້ອນຄະແນນ', value: 'create' },
      ],
      student_list: [],
      subjectList: [],
      monthList: [],
    }
  },
  mounted() {
    this._onGetYear()
  },
  methods: {
    async _onGetYear() {
      const userId = this.$cookies.get('user').id
      try {
        await this.$axios
          .$get(`/manage/score/school-year/${userId}`)
          .then((data) => {
            // console.log("Year", data)
            this.yearList = data
          })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    async _onGetclass(id) {
      try {
        const userId = this.$cookies.get('user').id
        await this.$axios
          .$get(`/manage/score/class/${userId}/${id}`)
          .then((data) => {
            console.log(data)
            this.class_list = data
          })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    async onGetStudent() {
      try {
        await this.$axios
          .$get(`/manage/students/${this.form.classId}`)
          .then((data) => {
            console.log(data)
            this.student_list = data
          })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    async onGetSubject() {
      const getLevelId = this.class_list.find(
        (el) => el.id === this.form.classId
      )
      this.form.levelId = getLevelId.level
      const userId = this.$cookies.get('user').id
      try {
        await this.$axios
          .$get(
            `/manage/score/subject/${userId}/${this.form.schoolYear}/${this.form.classId}`
          )
          .then((data) => {
            this.subjectList = data
            this.getMonth()
          })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    getMonth() {
      try {
        this.$axios
          .$get(`/manage/score/month/${this.form.levelId}`)
          .then((data) => {
            this.monthList = data
          })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    async onSave() {
      try {
        this.form.items = this.student_list
        await this.$axios
          .$post(`/manage/student/score`, this.form)
          .then((data) => {})
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
  },
}
</script>
