<template>
  <div>
    <v-card>
      <v-card-title>ຂໍ້ມູນອາຈານ</v-card-title>
      <v-card-text class="d-flex align-center">
        <v-spacer></v-spacer>
        <v-btn color="primary" small to="/teachers/store">ເພີ່ມ</v-btn>
      </v-card-text>
      <v-card-text>
        <v-data-table :items="teacher_list" :headers="teacher_head">
          <template v-slot:item="row">
            <tr>
              <td>{{ row?.item?.name }}</td>
              <td>{{ row?.item?.surname }}</td>
              <td>{{ row?.item?.gender }}</td>
              <td>{{ row?.item?.birthday }}</td>
              <td>{{ row?.item?.address }}</td>
              <td>{{ row?.item?.phoneNumber }}</td>
              <td>{{ row?.item?.username }}</td>
              <td>{{ row?.item?.password }}</td>
              <td>{{ row?.item?.userType }}</td>
              <td>
                <v-btn
                  small
                  color="primary"
                  @click="
                    _onGetDataUpdate(
                      row?.item?.id,
                      row?.item?.name,
                      row?.item?.gender,
                      row?.item?.birthday,
                      row?.item?.address,
                      row?.item?.phoneNumber,
                      row?.item?.username,
                      row?.item?.password,
                      row?.item?.userType,
                      row?.item?.surname
                    )
                  "
                >
                  <v-icon>mdi-pencil</v-icon>
                  ແກ້ໄຂ
                </v-btn>
              </td>
              <td>
                <v-btn
                  small
                  color="red"
                  @click="_onAskBeforeDeleted(row?.item?.id)"
                >
                  <v-icon color="white">mdi-delete</v-icon>
                  <span class="white--text">ລຶບ</span>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="showDialogUpdate" persistent width="1000">
      <v-card class="mx-auto pa-4">
        <div class="d-flex">
          <v-spacer></v-spacer>
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="primary"
            @click="showDialogUpdate = false"
          >
            <v-icon dark> mdi-close </v-icon>
          </v-btn>
        </div>
        <v-card-title>ເພີ່ມຂໍ້ມູນອາຈານ</v-card-title>
        <v-card-text>
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            "
          >
            <div style="width: 100%" class="px-4">
              <v-text-field
                dense
                outlined
                label="ຊື່"
                v-model="name"
              ></v-text-field>
            </div>
            <div style="width: 100%" class="px-4">
              <v-text-field
                dense
                outlined
                label="ນາມສະກຸນ"
                v-model="surname"
              ></v-text-field>
            </div>
            <div style="width: 100%" class="px-4">
              <v-select
                :items="items"
                outlined
                label="ເລືອກເພດ"
                dense
                v-model="gender"
              ></v-select>
            </div>
          </div>
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            "
          >
            <div style="width: 100%" class="px-4">
              <v-text-field
                dense
                outlined
                label="ວັນເດືອນປີເກີດ"
                v-model="birthdate"
              ></v-text-field>
            </div>
            <div style="width: 100%" class="px-4">
              <v-text-field
                dense
                outlined
                label="ທີ່ຢູ່"
                v-model="address"
              ></v-text-field>
            </div>
            <div style="width: 100%" class="px-4">
              <v-text-field
                dense
                outlined
                label="ເບີໂທ"
                v-model="mobile"
              ></v-text-field>
            </div>
          </div>
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            "
          >
            <div style="width: 100%" class="px-4">
              <v-text-field
                dense
                outlined
                label="ຊື່ຜູ້ໃຊ້"
                v-model="username"
              ></v-text-field>
            </div>
            <div style="width: 100%" class="px-4">
              <v-text-field
                dense
                outlined
                label="ລະຫັດຜ່ານ"
                v-model="password"
              ></v-text-field>
            </div>
            <div style="width: 100%" class="px-4">
              <v-select
                :items="typeList"
                outlined
                label="ເລືອກປະເພດ"
                dense
                v-model="type"
              ></v-select>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="pb-10">
          <v-spacer></v-spacer>
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
      key_update: '',
      teacher_list: [],
      teacher_head: [
        { text: 'ຊື່', value: '' },
        { text: 'ນາມສະກຸນ', value: '' },
        { text: 'ເພດ', value: '' },
        { text: 'ວ.ດ.ປີເກີດ', value: '' },
        { text: 'ທີ່ຢູ່', value: '' },
        { text: 'ເບີໂທ', value: '' },
        { text: 'ຊື່ຜູ້ໃຊ້', value: '' },
        { text: 'ລະຫັດຜ່ານ', value: '' },
        { text: 'ປະເພດສິດ', value: '' },
        { text: '', value: '' },
        { text: '', value: '' },
      ],
      showDialogUpdate: false,
      items: [
        {
          value: 'male',
          text: 'ຊາຍ',
        },
        {
          value: 'female',
          text: 'ຍີງ',
        },
      ],
      typeList: ['teacher', 'headmaster', 'technical'],
      name: '',
      surname: '',
      gender: '',
      birthdate: '',
      address: '',
      mobile: '',
      username: '',
      password: '',
      type: '',
    }
  },
  mounted() {
    this._onGet()
  },
  methods: {
    async _onGet() {
      try {
        await this.$axios.$get('/teacher').then((data) => {
          console.log(data)
          this.teacher_list = data
        })
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error,
        })
      }
    },
    async _onDelete(id) {
      try {
        await this.$axios.$delete(`/teacher/${id}`).then(() => {
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
    _onAskBeforeDeleted(id) {
      swal
        .fire({
          text: 'ທ່ານຕ້ອງການລຶບແທ້ບໍ',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK',
          cancelButtonText: 'NO',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this._onDelete(id)
          }
        })
    },
    _onGetDataUpdate(
      id,
      name,
      gender,
      birthday,
      address,
      phoneNumber,
      username,
      password,
      userType,
      surname
    ) {
      this.surname = surname
      this.key_update = id
      this.name = name
      this.gender = gender
      this.birthdate = birthday
      this.address = address
      this.mobile = phoneNumber
      this.username = username
      this.password = password
      this.type = userType
      this.showDialogUpdate = true
    },
    async _onUpdate() {
      let data = {
        name: this.name,
        surname: this.surname,
        gender: this.gender,
        birthday: this.birthdate,
        address: this.address,
        phoneNumber: this.mobile,
        type: this.type,
        userType: this.type,
        username: this.username,
        password: this.password,
      }

      try {
        await this.$axios
          .$put(`/teacher/${this.key_update}`, data)
          .then((data) => {
            swal.fire({
              icon: 'success',
              text: 'ສຳເລັດ',
            })
            this.showDialogUpdate = false
            this._onGet()
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
