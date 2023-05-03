<template>
  <div>
    <h3>ລາຍງານຜົນການຮຽນ</h3>
    <br />
    <v-row dense>
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
        <v-select
          v-model="form.monthId"
          :items="monthList"
          item-text="name"
          item-value="id"
          dense
          outlined
          label="ເລືອກເດືອນ"
          hide-details="auto"
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-btn color="primary" @click="onGetGrading">ຄົ້ນຫາ</v-btn>
      </v-col>
    </v-row>
    <v-card class="mt-5" flat>
      <v-simple-table>
        <thead>
          <tr>
            <th>ຊື່ ແລະ ນາມສະກຸນ</th>
            <th v-for="(item, index) in grade_list.subject" :key="index">
              {{ item.name }}
            </th>
            <th>ຄະແນນລວມ</th>
            <th>ຄະແນນສະເລ່ຍ</th>
            <th>ຈັດທີ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in grade_list.studentScore" :key="index">
            <td>{{ student.name }}</td>
            <td v-for="(item, index) in grade_list.subject" :key="index">
              {{ student.scores[item.subject] || '-' }}
            </td>
            <td>{{ student.total }}</td>
            <td>{{ student.average ? student.average.toFixed(2) : '-' }}</td>
            <td>{{ student.ranking }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      grade_list: {
        subject: [],
        studentScore: [],
      },
      form: {},
      yearList: [],
      levelList: [],
      classList: [],
      monthList: [],
    }
  },
  mounted() {
    this.onGetGrading()
    this._onGetYear()
  },
  methods: {
    async onGetGrading() {
      try {
        await this.$axios
          .$get(`/manage/display-score`, {
            params: { classId: this.form.classId, monthId: this.form.monthId },
          })
          .then((data) => {
            console.log('Year', data)
            this.grade_list = data
          })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    async _onGetLevel(id) {
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
