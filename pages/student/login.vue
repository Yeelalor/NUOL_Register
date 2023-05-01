<template>
  <div>
    <v-container>
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50vh;
        "
      >
        <v-card width="400" class="mx-auto" rounded="sm" elevation="1">
          <div class="text-center pt-10"><h3>ເຂົ້າສູ້ລະບົບ</h3></div>
          <v-card-text class="pa-6 pt-10">
            <v-text-field
              v-model="form.username"
              outlined
              dense
              label="ຊື່ຜູ້ໃຊ້"
              prepend-inner-icon="mdi-account"
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              outlined
              dense
              label="ລະຫັດຜ່ານ"
              type="password"
              prepend-inner-icon="mdi-lock"
              hide-details="auto"
            ></v-text-field>
            <p v-if="error" class="error--text">ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານຜິດ</p>
            <v-btn color="primary" class="mt-5" block @click="onRegister">
              ເຂົ້າສ่ູລະບົບ
            </v-btn>
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  layout: 'student',
  middleware: 'noAuth',
  data() {
    return {
      form: {
        type: 'student',
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
            this.$store.commit('login/setLogin', true)
            this.$router.push('/student')
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
