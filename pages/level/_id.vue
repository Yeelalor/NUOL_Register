<template>
  <v-card flat max-width="400" class="mx-auto">
    <v-card-title>ເພີ່ມຊັ້ນຮຽນ</v-card-title>
    <v-card-text>
      <v-form v-model="valid">
        <v-text-field
          v-model="form.name"
          :rules="nameRules"
          label="ຊັ້ນຮຽນ"
          placeholder="ຕົວຢ່າງ ມ3"
        ></v-text-field>
        <v-select
          v-model="form.schoolYear"
          :rules="nameRules"
          label="ສົກຮຽນ"
          :items="submissions"
          item-value="id"
          item-text="name"
        ></v-select>
        <v-select
          v-model="form.course"
          label="ຫຼັກສູດ"
          item-value="id"
          item-text="name"
          :items="courses"
        ></v-select>
        <v-select
          v-model="form.months"
          :items="months"
          chips
          label="ເດືອນ"
          multiple
          item-value="id"
          item-text="name"
        ></v-select>
        <v-btn color="primary" @click="submitForm"> ແກ້ໄຂ </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import swal from 'sweetalert2'
export default {
  data() {
    return {
      form: {
        name: null,
        schoolYear: null,
        course: null,
        months: [],
      },
      valid: false,
      submissions: [],
      months: [],
      courses: [],
      nameRules: [(v) => !!v || 'ຈຳເປັນ'],
    }
  },
  mounted() {
    this.onGet()
    this.onGetMonths()
    this.onGetCourse()

    this.$axios
      .get('/manage/level/' + this.$route.params.id)
      .then(({ data }) => {
        this.form.name = data.name
        this.form.schoolYear = data.schoolYearId
        this.form.course = data.courseId
      })
    this.$axios
      .get('/manage/level-months/' + this.$route.params.id)
      .then(({ data }) => {
        if (data) {
          const list = data.map((el) => {
            return el.month
          })
          console.log(list)
          this.form.months = list
        }
      })
  },
  methods: {
    async submitForm() {
      try {
        const response = await this.$axios.put(
          '/manage/level/' + this.$route.params.id,
          this.form
        )
        this.$router.go(-1)
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    async onGet() {
      try {
        const response = await this.$axios.get('/manage/school-year')
        this.submissions = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async onGetCourse() {
      try {
        await this.$axios.$get('/manage/course').then((data) => {
          this.courses = data
        })
      } catch (error) {
        console.error(error)
      }
    },
    async onGetMonths() {
      try {
        this.$axios.$get('/manage/months').then((data) => {
          this.months = data
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
