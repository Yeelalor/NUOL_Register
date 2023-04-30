<template>
  <div>
    <v-card max-width="1000" class="mx-auto" elevation="1">
      <v-card-text>
        <v-btn to="/level/create" small color="primary">ເພີ່ມຊັ້ນຮຽນ</v-btn>
        <v-data-table :items="cousesSubject" :headers="headers">
          <template #[`item.actions`]="{ item }">
            <v-btn small text color="primary" :to="`/level/${item.id}`">
              ແກ້ໄຂ
            </v-btn>
            <v-btn small text color="error" @click="onDelete(item.id)">
              ລົບອອກ
            </v-btn>
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
        { text: 'ຊັ້ນຮຽນ', value: 'name' },
        { text: 'ສົກຮຽນ', value: 'yearName' },
        { text: 'ຫຼັກສູດ', value: 'courseName' },
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
        await this.$axios.$get('/manage/level').then((data) => {
          this.cousesSubject = data
        })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    onDelete(id) {
      if (window.confirm('ທ່ານຕ້ອງການລົບແທ້ບໍ?')) {
        this.$axios.$delete('/manage/level/' + id).then((data) => {
          this.onGet()
        })
      }
    },
  },
}
</script>
