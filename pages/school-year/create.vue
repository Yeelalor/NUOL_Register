<template>
  <v-card flat max-width="400" class="mx-auto">
    <v-form v-model="valid">
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="ຊື່ສົກຮຽນ"
      ></v-text-field>
      <v-btn color="primary" @click="submitForm" :disabled="!valid"
        >ເພີ່ມ</v-btn
      >
    </v-form>
  </v-card>
</template>

<script>
import swal from 'sweetalert2'
export default {
  data() {
    return {
      name: '',
      valid: false,
      nameRules: [
        (v) => !!v || 'ຈຳເປັນ',
        (v) => (v && v.length <= 50) || 'Name must be less than 50 characters',
      ],
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await this.$axios.post('/manage/school-year', {
          name: this.name,
        })
        this.$router.go(-1)
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
