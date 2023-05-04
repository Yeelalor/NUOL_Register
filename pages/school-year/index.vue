<template>
  <div>
    <v-card max-width="1000" class="mx-auto" elevation="1">
      <v-card-title>
        ຂໍ້ມູນສົກຮຽນ
        <v-spacer></v-spacer>
        <v-btn to="/school-year/create" small color="primary">
          ເພີ່ມສົກຮຽນ
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="submissions">
          <template #[`item.actions`]="{ item }">
            <v-btn small text color="error" @click="onEdit(item)">
              ແກ້ໄຂ
            </v-btn>
          </template>
        </v-data-table>
        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-card-title>ແກ້ໄຂ</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="form.name"
                label="ຊື່ສົກຮຽນ"
              ></v-text-field>
              <v-btn color="primary" @click="onEditClick">ແກ້ໄຂ</v-btn>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
  data() {
    return {
      headers: [
        { text: 'ຊື່', value: 'name' },
        { text: 'ຈັດການ', value: 'actions' },
      ],
      submissions: [],
      form: {},
      dialog: false,
    }
  },
  mounted() {
    this.onGet()
  },
  methods: {
    async onGet() {
      try {
        const response = await this.$axios.get('/manage/school-year')
        this.submissions = response.data
      } catch (error) {
        console.error(error)
      }
    },
    onEdit(item) {
      this.form = { ...item }
      this.dialog = true
    },
    async onEditClick() {
      const form = { name: this.form.name }
      const response = await this.$axios.put(
        '/manage/school-year/' + this.form.id,
        form
      )
      swal.fire({
        icon: 'success',
        text: 'ສຳເລັດ',
      })
      this.dialog = false
      this.onGet()
    },
  },
}
</script>
