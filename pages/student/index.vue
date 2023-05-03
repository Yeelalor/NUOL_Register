<template>
  <div>
    <v-container>
      <v-card flat max-width="500" class="mx-auto">
        <v-card-title>ຄົ້ນຫາຄະແນນ</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6" md="6">
              <v-select
                v-model="form.schoolYear"
                dense
                outlined
                label="ເລືອກສົກຮຽນ"
                :items="schoolYear"
                item-value="id"
                item-text="name"
                hide-details="auto"
                @change="onChangeYear"
              ></v-select>
            </v-col>
            <v-col cols="6" md="6">
              <v-select
                v-model="form.monthId"
                dense
                outlined
                label="ເດືອນ"
                :items="monthList"
                hide-details="auto"
                item-value="id"
                item-text="name"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-btn color="primary" block @click="onSearch">ຄົ້ນຫາ</v-btn>
            </v-col>
          </v-row>
          <v-simple-table dense class="mt-5">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">ຊື່ວິຊາ</th>
                  <th class="text-left">ຄະແນນ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in grades.subject" :key="index">
                  <td>{{ item.name }}</td>
                  <td>{{ info.scores[item.subject] || '-' }}</td>
                </tr>
                <tr class="font-weight-bold">
                  <td>ຄະແນນລວມ</td>
                  <td>{{ info.total || '-' }}</td>
                </tr>
                <tr class="font-weight-bold">
                  <td>ຄະແນນສະເລ່ຍ</td>
                  <td>{{ info.average || '-' }}</td>
                </tr>
                <tr class="font-weight-bold">
                  <td>ອັນດັບທີ</td>
                  <td>{{ info.total ? info.ranking : '-' }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'student',
  middleware: 'auth',
  data() {
    return {
      schoolYear: [],
      monthList: [],
      form: {
        monthId: null,
        schoolYear: null,
      },
      grades: {
        studentScore: [],
        subject: [],
      },
      info: {},
    }
  },
  mounted() {
    try {
      const userId = this.$cookies.get('user').userId
      this.$axios('/student/school-year', {
        headers: {
          userId,
        },
      }).then(({ data }) => {
        this.schoolYear = data
      })
    } catch (error) {}
  },
  methods: {
    onChangeYear(e) {
      try {
        this.form.monthId = null
        const userId = this.$cookies.get('user').userId
        this.$axios('/student/months/' + e, {
          headers: {
            userId,
          },
        }).then(({ data }) => {
          if (data) {
            this.monthList = data
          } else {
            this.monthList = []
          }
        })
      } catch (error) {}
    },
    onSearch() {
      try {
        const userId = this.$cookies.get('user').userId
        this.$axios('/student/display-score', {
          headers: {
            userId,
          },
          params: this.form,
        }).then(({ data }) => {
          this.grades = data
          if (data.studentScore) {
            this.info = data.studentScore.find((el) => el.studentId === userId)
          }
        })
      } catch (error) {}
    },
  },
}
</script>
