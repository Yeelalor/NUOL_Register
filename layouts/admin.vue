<template>
  <v-app style="background-color: #f1f2f3">
    <Nuxt />
  </v-app>
</template>
<script>
export default {
  middleware: 'noAuthAdmin',
  computed: {
    isLogin() {
      return this.$store.state.login.isLogin
    },
  },
  mounted() {
    if (
      this.$cookies.get('user') &&
      this.$cookies.get('userType') !== 'student'
    ) {
      this.$store.commit('login/setAdminLogin', true)
    }
  },
  methods: {
    onLogout() {
      this.$store.commit('login/setAdminLogin', false)
      this.$cookies.remove('user')
      this.$cookies.remove('userType')
    },
  },
}
</script>
