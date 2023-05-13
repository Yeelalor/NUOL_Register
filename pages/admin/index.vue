<template>
  <div>
    <v-card max-width="400" class="mx-auto mt-10" elevation="1">
      <v-card-title>ເຂົ້າສູ່ລະບົບລົງທະບຽນ</v-card-title>
      <v-card-subtitle>ໂຮງຮຽນປະຖົມແກ້ວບັນດິດ</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.username"
              outlined
              label="ຊື່ຜູ້ໃຊ້"
              placeholder="sompany"
              dense
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.password"
              outlined
              label="ລະຫັດຜ່ານ"
              placeholder="********"
              dense
              hide-details="auto"
              type="password"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn color="primary" @click="onRegister">ເຂົ້າສູ່ລະບົບ</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data() {
    return {
      form: {
        type: '',
      },
      error: false,
    }
  },
  methods: {
    onRegister() {
      try {
        this.$axios
          .post('/user/login', this.form)
          .then(({ data }) => {
            this.$cookies.set('userType', data.userType)
            this.$cookies.set('user', data)
            if(data.userType === 'teacher') {
              this.$router.push('/grading-save')
            } else {
              this.$router.push('/teachers/edit')

            }
          })
          .catch((err) => {
            this.error = true
          })
      } catch (error) {
        this.error = true
      }
    },
  },
}
</script>
