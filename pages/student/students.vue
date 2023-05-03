<template>
  <div>
    <v-card>
      <v-card-title>ຂໍ້ມູນນັກຮຽນ</v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="2">
            <v-text-field
              v-model="form.name"
              dense
              outlined
              label="ຊື່ນັກຮຽນ"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="form.schoolYear"
              :items="yearList"
              item-text="name"
              item-value="id"
              dense
              outlined
              label="ເລືອກສົກຮຽນ"
              @change="_onGetLevel"
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="form.levelId"
              :items="levelList"
              item-text="levelName"
              item-value="levelId"
              dense
              outlined
              label="ເລືອກຊັ້ນຮຽນ"
              @change="_onGetClass"
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="form.classId"
              :items="classList"
              item-text="name"
              item-value="id"
              dense
              outlined
              label="ເລືອກຫ້ອງຮຽນ"
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-btn color="primary" @click="onGetStudent">ຄົ້ນຫາ</v-btn>
          </v-col>
        </v-row>
        <div class="pt-4">
          <v-divider></v-divider>
          <v-data-table :items="student_list" :headers="student_header">
            <template #[`item.name`]="{ item }">
              <span>{{ item.name }} {{ item.surname }}</span>
            </template>
            <template #[`item.birthday`]="{ item }">
              <span>{{ $moment(item.birthday).format('DD-MM-YYYY') }}</span>
            </template>
          </v-data-table>
        </div>
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
      monthList: [],
      form: {
        classId: null,
        levelId: null,
        schoolYear: null,
        name: null,
      },
      student_list: [],
      student_header: [
        { text: 'ຊື່ ແລະ ນາມສະກຸນ', value: 'name' },
        { text: 'ຫ້ອງຮຽນ', value: 'className' },
        { text: 'ຊັ້ນຮຽນ', value: 'levelName' },
        { text: 'ວ.ດ.ປີເກີດ', value: 'birthday' },
        { text: 'ຊົນເຜົ່າ', value: 'tribe' },
        { text: 'ສະຖານະ', value: 'status' },
        { text: 'ທີ່ຢູ່ປະຈຸບັນ', value: 'address' },
        { text: 'ທີ່ຢູ່ເກີດ', value: 'bornAddress' },
        { text: 'ຊື່ຜູ້ປົກຄອງ', value: 'parentName' },
        { text: 'ເບີຜູ້ປົກຄອງ', value: 'parentPhone' },
        { text: 'ອາຊີບຜູ້ປົກຄອງ', value: 'parentJob' },
      ],
    }
  },
  mounted() {
    this._onGetYear()
    this.onGetStudent()
  },
  methods: {
    async onGetStudent() {
      try {
        await this.$axios
          .$get(`/report/students`, { params: this.form })
          .then((data) => {
            this.student_list = data
            console.log('......', data)
          })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    async _onGetLevel(id) {
      this.form.levelId = null
      this.form.classId = null
      try {
        await this.$axios
          .$get(`/registration/level-by-school-year/${id}`)
          .then((data) => {
            this.levelList = data
            console.log(data)
          })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    async _onGetClass(id) {
      this.form.classId = null
      try {
        await this.$axios
          .$get(`/registration/class-by-level/${id}`)
          .then((data) => {
            this.classList = data
            this.getMonth()
          })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    async _onGetYear() {
      try {
        await this.$axios.$get('/manage/school-year').then((data) => {
          console.log(data)
          this.yearList = data
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
  },
}
</script>

<style></style>
