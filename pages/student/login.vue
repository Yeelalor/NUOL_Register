<template>
    <div>
        <v-container>
          <div style="display:flex;justify-content:center;align-items:center;height:90vh">
            <v-card width="400" class="mx-auto" rounded="xl" elevation="0">
            <div class="text-center pt-10"><h3>ເຂົ້າສູ້ລະບົບ</h3></div>
              <v-card-text class="pa-6 pt-10">
                <v-text-field outlined dense label="ຊື່ຜູ້ໃຊ້" prepend-inner-icon="mdi-account"></v-text-field>
                <v-text-field outlined dense label="ລະຫັດຜ່ານ" prepend-inner-icon="mdi-lock"></v-text-field>
                <v-btn color="primary" block rounded to="/student/search_score">ເຂົ້າສູ້ລະບົບ</v-btn>
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