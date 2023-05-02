<template>
  <div>
    <div class="px-10">
      <!-- {{ registration }} -->
      <div class="text-center">ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</div>
      <div class="text-center">ສັນຕິພາບ ເອກະລາດ ປະຊາທິີປະໄຕ ເອກະພາບ ວັດທະນາຖາວອນ</div>
      <div class="text-center font-weight-bold pt-10">ໃບບິນລົງທະບຽນ</div>
      <span class="mt-10">ຂໍ້ມູນລົງທະບຽນ</span>
      <v-divider ></v-divider>
      <v-simple-table >
        <thead>
          <tr>
            <th>ຊື່ ແລະ ນາມສະກຸນ</th>
            <th>ເພດ</th>
            <th>ວັນເດືອນປີເກີດ</th>
            <th>ຫ້ອງຮຽນ</th>
            <th>ຊັ້ນຮຽນ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ registration.detail.name }} {{ registration.detail.surname }}</td>
            
            <td>{{ registration.detail.gender }}</td>
            <td>{{ registration.detail.birthday }}</td>
            <td>{{ registration.detail.className }}</td>
            <td>{{ registration.detail.levelName }}</td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-divider></v-divider>

      <div style="height:50px"></div>
      <span class="mt-10">ຄ່າທຳນຽມຕ່າງໆ</span>
      <v-divider ></v-divider>
      <v-simple-table >
        <thead>
          <tr>
            <th>ລາຍການ</th>
            <th>ລາຄາ</th>
            <th>ໝາຍເຫດ</th>
            <th>ສະຖານະ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in registration.invoice" :key="index">
            <td>{{ item.name }}</td>
            
            <td>{{ item.price }}</td>
            <td>{{ item.remark }}</td>
            <td>{{ item.invoiceStatus }}</td>
          </tr>
          <tr >
            <td></td>
            
            <td></td>
            <td class="font-weight-bold">ລວມທັງມົດ:</td>
            <td class="font-weight-bold">100000000 ກີບ</td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-divider></v-divider>
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
      total:''
    }
  },
  mounted() {
    try {
      this.$axios
        .get('/registration/registration-detail/' + this.$route.params.id)
        .then((data) => {
          this.registration = data?.data
          for(let i = 0;i<data?.data?.invoice.lenght;i++){
            console.log(data?.data?.invoice[i].price)
          }
        })
    } catch (error) { }
  },
}
</script>
