<template>
  <v-app style="background-color: #f1f2f3">
    <v-app-bar fixed app>
      <h3 style="cursor: pointer" @click="$router.push('/')">
        ໂຮງຮຽນມັດທະຍົມສຶກສາສົມບູນສາທິດ
      </h3>
      <v-spacer></v-spacer>
      <v-btn v-if="isLogin" to="/student/search-score" elevation="0"
        >ກວດສອບຄະແນນ</v-btn
      >
      <v-btn elevation="0" to="/student/about-us">ກ່ຽວກັບພວກເຮົາ</v-btn>
      <v-btn v-if="!isLogin" elevation="0" to="/student/login">
        ເຂົ້າສູ່ລະບົບ
      </v-btn>
      <v-btn v-else elevation="0" @click="onLogout"> ອອກຈາກລະບົບ </v-btn>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>
<script>
export default {
  computed: {
    isLogin() {
      return this.$store.state.login.isLogin
    },
  },
  mounted() {
    if (
      this.$cookies.get('user') &&
      this.$cookies.get('userType') === 'student'
    ) {
      this.$store.commit('login/setLogin', true)
    }
  },
  methods: {
    onLogout() {
      this.$store.commit('login/setLogin', false)
      this.$cookies.remove('user')
      this.$cookies.remove('userType')
    },
  },
}
</script>
