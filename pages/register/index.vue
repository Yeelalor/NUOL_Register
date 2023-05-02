<template>
  <div>
    <v-form ref="form" v-model="valid">
      <v-card>
        <v-toolbar flat>
          <div style="padding-bottom: 20px; padding-top: 20px; width: 100%">
            ລົງທະບຽນ
          </div>
          <template v-slot:extension>
            <v-tabs v-model="tab">
              <v-tabs-slider color="#338ABF"></v-tabs-slider>
              <v-tab v-for="item in items" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <v-divider></v-divider>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card>
              <v-card-text>
                <v-card flat>
                  <v-card-title>ຂໍ້ມູນລົງທະບຽນ</v-card-title>
                  <v-card-text> </v-card-text>
                </v-card>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card>
              <v-card-text>
                <v-card flat>
                  <v-card-title>ຂໍ້ມູນຜູ້ໃຊ້ລະບົບ</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="4" md="4">
                        <v-text-field
                          v-model="form.username"
                          outlined
                          dense
                          label="ຊື່ຜູ້ໃຊ້ງານ"
                          :rules="nameRules"
                          @change="onChangeUsername"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4" md="4">
                        <v-text-field
                          v-model="form.password"
                          outlined
                          dense
                          label="ລະຫັດຜ່ານ"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
                <v-card flat>
                  <v-card-title>ຂໍ້ມູນນັກຮຽນ</v-card-title>
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" md="4" sm="4">
                        <v-text-field
                          outlined
                          dense
                          label="ຊື່"
                          v-model="form.name"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="4">
                        <v-text-field
                          outlined
                          dense
                          label="ນາມສະກຸນ"
                          v-model="form.surname"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="4">
                        <v-select
                          :items="genders"
                          outlined
                          label="ເລືອກເພດ"
                          dense
                          v-model="form.gender"
                          :rules="nameRules"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="12" md="4" sm="4">
                        <v-text-field
                          outlined
                          dense
                          label="ວັນເດືອນປີເກີດ"
                          v-model="form.birthday"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="4">
                        <v-text-field
                          outlined
                          dense
                          label="ທີ່ຢູ່ບ້ານເກີດ"
                          v-model="form.bornAddress"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="4">
                        <v-text-field
                          outlined
                          dense
                          label="ທີ່ຢູ່ປະຈຸບັນ"
                          v-model="form.address"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="12" md="4" sm="4">
                        <v-text-field
                          outlined
                          dense
                          label="ຊົນເຜົ່າ"
                          v-model="form.tribe"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="4">
                        <v-text-field
                          outlined
                          dense
                          label="ສະຖານະ"
                          v-model="form.status"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="4">
                        <v-text-field
                          outlined
                          dense
                          label="ຜູ້ປົກຄອງ"
                          v-model="form.parent_name"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="12" md="4" sm="4">
                        <v-text-field
                          outlined
                          dense
                          label="ອາຊີບຜູ້ປົກຄອງ"
                          v-model="form.parent_job"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="4">
                        <v-text-field
                          outlined
                          dense
                          label="ເບີໂທ"
                          v-model="form.parent_phone"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="4">
                        <v-file-input
                          v-model="form.image"
                          outlined
                          dense
                          label="ເລືອກຮູບ"
                        ></v-file-input>
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="12" md="4" sm="4">
                        <v-select
                          v-model="form.schoolYear"
                          :items="yearList"
                          item-text="name"
                          item-value="id"
                          dense
                          outlined
                          label="ເລືອກສົກຮຽນ"
                          :rules="nameRules"
                          @change="_onGetLevel"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="4" sm="4">
                        <v-select
                          v-model="form.levelId"
                          :items="levelList"
                          item-text="levelName"
                          item-value="levelId"
                          dense
                          outlined
                          label="ເລືອກຊັ້ນຮຽນ"
                          :rules="nameRules"
                          @change="_onGetClass"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="4" sm="4">
                        <v-select
                          v-model="form.classId"
                          :items="classList"
                          item-text="name"
                          item-value="id"
                          dense
                          outlined
                          label="ເລືອກຫ້ອງຮຽນ"
                          :rules="nameRules"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card flat>
                  <v-card-title>ຄ່າທຳນຽມຕ່າງໆ</v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="invoice.remark"
                      label="ຄຳອະທີບາຍເພີ່ມເຕີມ"
                      :rules="nameRules"
                    ></v-text-field>
                  </v-card-text>
                  <v-card-text>
                    <v-row
                      v-for="(item, index) in invoice.items"
                      :key="index"
                      dense
                    >
                      <v-col cols="12" md="3" sm="3">
                        <v-text-field
                          v-model="item.name"
                          :items="yearList"
                          item-text="name"
                          item-value="id"
                          dense
                          outlined
                          label="ຊື່ລາຍການລົງທະບຽນ"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="3" sm="3">
                        <v-text-field
                          v-model="item.price"
                          :items="levelList"
                          item-text="levelName"
                          item-value="levelId"
                          dense
                          outlined
                          label="ລາຄາ"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="3" sm="3">
                        <v-text-field
                          v-model="item.remark"
                          :items="classList"
                          dense
                          outlined
                          label="ໝາຍເຫດ"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="3" sm="3">
                        <v-btn color="primary" @click="invoice.items.push({})"
                          >ເພີ່ມລາຍການ</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" @click="onRegistration">
                      ລົງທະບຽນ
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-form>
  </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
  data() {
    return {
      tab: null,
      items: ['ນັກຮຽນເກົ່າ', 'ນັກຮຽນໃໝ່'],
      yearList: [],
      levelList: [],
      classList: [],
      form: {},
      invoice: {
        remark: null,
        items: [
          {
            name: '',
            price: '',
            remark: '',
          },
        ],
      },
      genders: [
        {
          value: 'male',
          text: 'ຊາຍ',
        },
        {
          value: 'female',
          text: 'ຍີງ',
        },
      ],
      nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນ'],
      valid: true,
    }
  },
  mounted() {
    this._onGetYear()
    // this._onGetLevel()
  },

  methods: {
    // _onGetImage(file) {
    //     const formData = new FormData();
    //     formData.append('image', file);
    //     this.imageForm = formData;
    // },
    async _onGetLevel(id) {
      try {
        await this.$axios
          .$get(`/registration/level-by-school-year/${id}`)
          .then((data) => {
            this.levelList = data
            console.log(data)
          })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    async _onGetClass(id) {
      try {
        await this.$axios
          .$get(`/registration/class-by-level/${id}`)
          .then((data) => {
            this.classList = data
          })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
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
          text: error,
        })
      }
    },
    async onRegistration() {
      if (!this.$refs.form.validate()) return null
      try {
        const formData = new FormData()

        for (const prop in this.form) {
          const value = this.form[prop]
          formData.append(prop, value)
        }
        formData.append('invoice', JSON.stringify(this.invoice))
        await this.$axios
          .$post('/registration/new-student', formData)
          .then((data) => {
            swal.fire({
              icon: 'success',
              text: 'ສຳເລັດ',
            })
            window.open('/registration-completed/' + data.id)
          })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    onChangeUsername(name) {
      try {
        this.$axios.$get('/user/check-username/' + name).then((data) => {
          console.log(data)
          if (data.length > 0) {
            this.form.username = null
            swal.fire({
              icon: 'error',
              text: 'ຊື່ນີ້ມີຄົນນຳໃຊ້ແລ້ວ',
            })
          }
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
