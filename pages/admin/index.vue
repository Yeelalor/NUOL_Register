<template>
  <div>
    <v-card max-width="400" class="mx-auto mt-10" elevation="1">
      <v-card-title>ເຂົ້າສູ່ລະບົບລົງທະບຽນ</v-card-title>
      <v-card-subtitle>ມັດທະຍົມສົມບູນສາທິດ</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              outlined
              label="ຊື່ຜູ້ໃຊ້"
              placeholder="sompany"
              dense
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              label="ລະຫັດຜ່ານ"
              placeholder="********"
              dense
              hide-details="auto"
              type="password"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn color="primary">ເຂົ້າສູ່ລະບົບ</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: 'admin',
}
</script>
