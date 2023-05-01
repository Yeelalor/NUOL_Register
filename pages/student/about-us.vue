<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <div>Place to learn</div>
      </v-col>
      <v-col cols="12" md="6">
        <div>Place to learn</div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'student',
  middleware: 'auth',
}
</script>
