<template>
    <div>
        <v-container>
          <div style="display:flex;justify-content:center;align-items:center;height:100vh">
            <v-card width="400" class="mx-auto" rounded="xl" elevation="5">
              <v-card-text class="pa-6 pt-10">
                <v-text-field outlined dense label="ຊື່ຜູ້ໃຊ້" prepend-inner-icon="mdi-account"></v-text-field>
                <v-text-field outlined dense label="ລະຫັດຜ່ານ" ></v-text-field>
              </v-card-text>
            </v-card>
          </div>
        </v-container>
    </div>
</template>
<script>
export default {
  layout: '_blank'
}
</script>