<template>
  <div>
    <v-card max-width="1000" class="mx-auto pa-4" elevation="1">
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
        <v-btn color="primary" @click="_oninsert">ບັນທຶກ</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
  data() {
    return {
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
  methods: {
    async _oninsert() {
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
        await this.$axios.$post('/teacher', data).then((data) => {
          swal.fire({
            icon: 'success',
            text: 'ສຳເລັດ',
          })
          this.$router.push('/teachers/edit')
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
