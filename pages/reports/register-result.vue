<template>
  <div>
    <h3>ລາຍງານການລົງທະບຽນ</h3><br />
    <v-row dense>
      <v-col cols="2">
        <v-select v-model="form.schoolYear" :items="yearList" item-text="name" item-value="id" dense outlined
          label="ເລືອກສົກຮຽນ" @change="_onGetLevel" hide-details="auto"></v-select>
      </v-col>
      <v-col cols="2">
        <v-select v-model="form.levelId" :items="levelList" item-text="levelName" item-value="levelId" dense outlined
          label="ເລືອກຊັ້ນຮຽນ" @change="_onGetClass" hide-details="auto"></v-select>
      </v-col>
      <v-col cols="2">
        <v-select v-model="form.classId" :items="classList" item-text="name" item-value="id" dense outlined
          label="ເລືອກຫ້ອງຮຽນ" hide-details="auto"></v-select>
      </v-col>
      <!-- <v-col cols="2">
        <v-select v-model="form.monthId" :items="monthList" item-text="name" item-value="id" dense outlined
          label="ເລືອກເດືອນ" hide-details="auto"></v-select>
      </v-col> -->
      <v-col cols="2">
        <v-btn color="primary" @click="onGetStudent">ຄົ້ນຫາ</v-btn>
      </v-col>

    </v-row>
    <div class="pt-4">
      <v-divider></v-divider>
      <v-data-table :items="student_list" :headers="student_header">
        <template #[`item.name`]="{ item }">
            <span>{{ item.name }} {{ item.surname }}</span>
          </template>
        <template #[`item.paymentStatus`]="{ item }">
            <span v-if="item.paymentStatus === 'unpaid'" class="red--text">ຍັງບໍຈ່າຍ</span>
            <span v-else>ຈ່າຍແລ້ວ</span>
          </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2'
export default {
  data() {
    return {
      yearList: [],
      levelList: [],
      classList: [],
      monthList: [],
      form: {
        classId: null,
        levelId:null,
        schoolYear:null
      },
      student_list:[],
      student_header:[
        {text:'ຊື່ ແລະ ນາມສະກຸນ',value:'name'},
        {text:'ຫ້ອງຮຽນ',value:'className'},
        {text:'ຊັ້ນຮຽນ',value:'levelName'},
        {text:'ວ.ດ.ປີເກີດ',value:'birthday'},
        {text:'ຊົນເຜົ່າ',value:'tribe'},
        {text:'ສະຖານະ',value:'status'},
        {text:'ທີ່ຢູ່ປະຈຸບັນ',value:'address'},
        {text:'ທີ່ຢູ່ເກີດ',value:'bornAddress'},
        {text:'ຊື່ຜູ້ປົກຄອງ',value:'parentName'},
        {text:'ເບີຜູ້ປົກຄອງ',value:'parentPhone'},
        {text:'ອາຊີບຜູ້ປົກຄອງ',value:'parentJob'},
        {text:'ຈ່າຍ',value:'paymentStatus'},
      ]
    }
  },
  mounted() {
    this._onGetYear()
  },
  methods: {
    async onGetStudent() {
      try {
        await this.$axios.$get(`/report/registration`,{params:{schoolYear:this.form.schoolYear,levelId: this.form.levelId,classId: this.form.classId}}).then((data) => {
          this.student_list = data
          console.log("......",data)
        })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error
        })
      }
    },
    async _onGetLevel(id) {
      this.form.levelId = null;
      this.form.classId = null
      try {
        await this.$axios.$get(`/registration/level-by-school-year/${id}`).then((data) => {
          this.levelList = data
          console.log(data)
        })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error
        })
      }
    },
    async _onGetClass(id) {
      this.form.classId = null
      try {
        await this.$axios.$get(`/registration/class-by-level/${id}`).then((data) => {
          this.classList = data;
          this.getMonth()
        })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error
        })
      }
    },
    async _onGetYear() {
      try {
        await this.$axios.$get('/manage/school-year').then((data) => {
          console.log(data)
          this.yearList = data

        })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error
        })
      }
    },
    getMonth() {
      try {
        this.$axios
          .$get(`/manage/score/month/${this.form.levelId}`)
          .then((data) => {
            this.monthList = data
          })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
  }
}
</script>

<style></style>