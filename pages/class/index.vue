<template>
  <div class="pt-4">
    <v-card width="1000" class="mx-auto" elevation="1">
      <v-card-text>
        <div>
          <v-btn color="primary" to="/class/create" small>ເພີ່ມລາຍການ</v-btn>
        </div>
        <v-data-table :items="list" :headers="headers" dense class="mt-1">
          <template #[`item.actions`]="{ item }">
            <v-btn
              color="primary"
              small
              dark
              v-bind="attrs"
              v-on="on"
              @click="
                _onGetForUp(item.id, item.name, item?.schoolYear, item?.level)
              "
            >
              ແກ້ໄຂ
            </v-btn>
            <v-btn small color="error" @click="onDelete(item.id)">ລົບ</v-btn>
          </template>
          <template #[`item.index`]="{ index }">
            {{ index + 1 }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog width="500" v-model="showDialogUp">
      <v-card>
        <v-card-title>ແກ້ໄຂ</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="form.name"
            dense
            outlined
            label="ຊື່ຫ້ອງຮຽນ"
          ></v-text-field>

          <v-select
            v-model="form.schoolYear"
            :items="yearList"
            item-text="name"
            item-value="id"
            dense
            outlined
            label="ເລືອກສົກຮຽນ"
          ></v-select>
          <v-select
            v-model="form.level"
            :items="levelList"
            dense
            outlined
            item-text="name"
            item-value="id"
            label="ຊື່ຊັ້ນຮຽນ"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showDialogUp = false">ປິດ</v-btn>
          <v-btn color="primary" @click="_onUpdate">ບັນທຶກ</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
  data() {
    return {
      list: [],
      headers: [
        { text: 'ລຳດັບ', value: 'index' },
        { text: 'ຫ້ອງຮຽນ', value: 'name' },
        { text: 'ສົກຮຽນ', value: 'year' },
        { text: 'ຊັ້ນຮຽນ', value: 'levelName' },
        { text: 'ຈັດການ', value: 'actions' },
      ],
      form: {
        name: '',
        schoolYear: '',
        level: '',
      },
      key: '',
      showDialogUp: false,
      yearList: [],
      levelList: [],
    }
  },
  mounted() {
    this._onGet()
    this._onGets()
    this._onGetLevel()
  },
  methods: {
    async _onGetForUp(id, name, schoolYear, level) {
      this.key = id
      this.form.name = name
      this.form.schoolYear = schoolYear
      this.form.level = level
      this.showDialogUp = true
    },
    async _onGet() {
      try {
        await this.$axios.$get('/manage/class').then((data) => {
          this.list = data
          console.log(data)
        })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },

    async _onUpdate() {
      try {
        await this.$axios
          .$put(`/manage/class/${this.key}`, this.form)
          .then(() => {
            swal.fire({
              icon: 'success',
              text: 'ສຳເລັດ',
            })
            this._onGet()
            this.form.name = ''
            this.showDialogUp = false
          })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    async onDelete(item) {
      this.key = item
      try {
        await this.$axios
          .$delete(`/manage/class/${this.key}`, this.form)
          .then(() => {
            swal.fire({
              icon: 'success',
              text: 'ສຳເລັດ',
            })
            this._onGet()
          })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    async _onGets() {
      try {
        await this.$axios.$get('/manage/school-year').then((data) => {
          console.log(data)
          this.yearList = data
        })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    async _onGetLevel() {
      try {
        await this.$axios.$get('/manage/level').then((data) => {
          console.log(data)
          this.levelList = data
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
