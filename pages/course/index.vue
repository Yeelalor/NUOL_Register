<template>
  <div>
    <v-card max-width="1000" class="mx-auto" elevation="1">
      <v-card-title>
        ຂໍ້ມູນຫຼັກສູດການຮຽນ
        <v-spacer></v-spacer>
        <v-btn to="/course/create" small color="primary">ເພີ່ມຫຼັກສຸດ</v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :items="course" :headers="headers">
          <template #[`item.subjects`]="{ item }">
            <ul>
              <li v-for="(data, index) in onSubject(item.id)" :key="index">
                {{ data.name }}
              </li>
            </ul>
          </template>
          <template #[`item.actions`]="{ item }">
            <v-btn small color="primary" :to="`/course/${item.id}`"
              >ແກ້ໄຂ</v-btn
            >
            <v-btn small color="error" @click="onDeleteCourse(item.id)"
              >ລົບ</v-btn
            >
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      course: [],
      cousesSubject: [],
      headers: [
        { text: 'ຊື່ຫຼັກສຸດ', value: 'name' },
        { text: 'ວິຊາຮຽນ', value: 'subjects' },
        { text: 'ຈັດການ', value: 'actions' },
      ],
    }
  },
  mounted() {
    this.onGet()
  },
  methods: {
    async onGet() {
      try {
        await this.$axios.$get('/manage/course').then((data) => {
          this.course = data
        })
        await this.$axios.$get('/manage/course-subject').then((data) => {
          this.cousesSubject = data
        })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    onSubject(id) {
      if (this.cousesSubject.length === 0) return []
      return this.cousesSubject.filter((el) => el.courseId === id)
    },
    onDeleteCourse(id) {
      if (window.confirm('ທ່ານຕ້ອງການລົບແທ້ບໍ?')) {
        this.$axios.$delete('/manage/course/' + id).then((data) => {
          this.onGet()
        })
      }
    },
  },
}
</script>
