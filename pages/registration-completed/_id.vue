<template>
  <div>
    <div>
      {{ registration }}
    </div>
  </div>
</template>
<script>
export default {
  layout: '_blank',
  data() {
    return {
      registration: {
        detail: {},
        invoice: [],
      },
    }
  },
  mounted() {
    try {
      this.$axios
        .get('/registration/registration-detail/' + this.$route.params.id)
        .then((data) => {
          this.registration = data
        })
    } catch (error) {}
  },
}
</script>
