<template>
  <div>
    <v-container>
      <v-card flat max-width="500" class="mx-auto">
        <v-card-title>ຄົ້ນຫາຄະແນນ</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="12">
              <v-select
                dense
                outlined
                label="ເລືອກສົກຮຽນ"
                :items="schoolYear"
                item-value="id"
                item-text="name"
                hide-details="auto"
              ></v-select>
            </v-col>
            <v-col cols="12" md="12">
              <v-select
                dense
                outlined
                label="ເດືອນ"
                :items="['ກັນຍາ', 'ຕຸລາ']"
                hide-details="auto"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-btn color="primary" block>ຄົ້ນຫາ</v-btn>
            </v-col>
          </v-row>
          <v-simple-table dense class="mt-5">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">ຊື່ວິຊາ</th>
                  <th class="text-left">ຄະແນນ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ພາສາລາວ</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>ຄະນິດສາດ</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>ຄະນິດສາດ</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>ຄະນິດສາດ</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>ຄະນິດສາດ</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>ຄະນິດສາດ</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>ຄະນິດສາດ</td>
                  <td>9</td>
                </tr>
                <tr class="font-weight-bold">
                  <td>ຄະແນນລວມ</td>
                  <td>99</td>
                </tr>
                <tr class="font-weight-bold">
                  <td>ຄະແນນສະເລ່ຍ</td>
                  <td>8.4</td>
                </tr>
                <tr class="font-weight-bold">
                  <td>ອັນດັບທີ</td>
                  <td>4</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'student',
  middleware: 'auth',
  data() {
    return {
      schoolYear: [],
    }
  },
  mounted() {
    this.$axios('/manage/school-year').then(({ data }) => {
      this.schoolYear = data
    })
  },
}
</script>
