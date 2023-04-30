<template>
  <div>
    <v-card flat max-width="600" class="mx-auto">
      <v-card-title>ເພີ່ມຫຼັກສຸດ</v-card-title>
      <v-card-text>
        <v-text-field v-model="form.name" label="ຊື່ຫຼັກສຸດ"></v-text-field>
        <v-autocomplete
          v-model="form.subjects"
          label="ວິຊາຮຽນ"
          chips
          small-chips
          multiple
          :items="list"
          item-value="id"
          item-text="name"
        ></v-autocomplete>
        <v-btn small color="primary" @click="onCreate">ແກ້ໄຂ</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
  data() {
    return {
      list: [],
      form: {
        name: null,
        subjects: [],
      },
    }
  },
  mounted() {
    this._onGet()
    this.$axios
      .get('/manage/course/' + this.$route.params.id)
      .then(({ data }) => {
        this.form.name = data.name
      })
    this.$axios
      .get('/manage/course-subject/' + this.$route.params.id)
      .then(({ data }) => {
        if (data) {
          const list = data.map((el) => {
            return el.subject
          })
          this.form.subjects = list
        }
      })
  },
  methods: {
    async _onGet() {
      try {
        await this.$axios.$get('/manage/subjects').then((data) => {
          this.list = data
        })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    async onCreate() {
      try {
        await this.$axios
          .$put('/manage/course/' + this.$route.params.id, this.form)
          .then((data) => {
            this.$router.go(-1)
          })
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
