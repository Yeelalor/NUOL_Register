<template>
  <div>
    <v-card class="pa-4">
      <v-card-title>
        ຂໍ້ມູນຈັດອາຈານສອນຕາມເວລາ
        <v-spacer></v-spacer>
        <v-btn color="primary" to="/teacher-course/create">ເພີ່ມ</v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="teacher_head" :items="teacher_list">
          <template #[`item.actions`]="{ item }">
            <v-btn small text color="error">ລົບເດືອນ</v-btn>
            <v-btn
              color="primary lighten-2"
              text
              small
              dark
              @click="
                onEdit(
                  item?.levelId,
                  item?.teacherId,
                  item?.schoolYear,
                  item?.subjectId
                )
              "
            >
              ແກ້ໄຂ
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
  data() {
    return {
      teacher_head: [
        { text: 'ຊື່ອາຈານສອນ', value: 'name' },
        { text: 'ນາມສະກຸນ', value: 'surname' },
        { text: 'ສົກຮຽນ', value: 'schoolYearName' },
        { text: 'ຫ້ອງຮຽນ', value: 'className' },
        { text: 'ວີຊາສອນ', value: 'subjectName' },
        { text: 'ຈັດການ', value: 'actions' },
      ],
      teacher_list: [],
    }
  },
  mounted() {
    this.onGetTeacCourseList()
  },
  methods: {
    async onGetTeacCourseList() {
      try {
        await this.$axios.$get(`/manage/level-class-teacher`).then((data) => {
          this.teacher_list = data
        })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    onEdit(lId, tId, yId, sId) {
      this.$router.push({
        path: '/teacher-course/edit',
        query: {
          levelId: lId,
          teacherId: tId,
          schoolYear: yId,
          subjectId: sId,
        },
      })
    },
  },
}
</script>
