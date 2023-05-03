<template>
    <div>
        <v-row>
            <v-col cols="2">
                <v-text-field dense outlined v-model="key" label="ເລກໃບບິນລົງທະບຽນ"></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-btn color="primary" @click="onSearch(key)">ຄົ້ນຫາ</v-btn>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <div style="max-width:800px" v-if="registration.invoice.length != 0">
            <!-- {{ registration }} -->

            <v-divider></v-divider>
            <v-simple-table>
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
            <v-divider></v-divider>
            <v-simple-table>
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
                        <td v-if="item.invoiceStatus === 'paid'">ຈ່າຍແລ້ວ</td>
                        <td v-else>ຍັງບໍຈ່າຍ</td>
                    </tr>
                    <tr>
                        <td></td>

                        <td></td>
                        <td class="font-weight-bold">ລວມທັງມົດ:</td>
                        <td class="font-weight-bold">{{ sumTotal(registration?.invoice) }} ກີບ</td>
                    </tr>
                </tbody>
            </v-simple-table>
            <v-divider></v-divider>
            <div class="pt-10">
                <v-btn color="primary" block rounded @click="onConfirm" v-if="registration?.detail?.paymentStatus != 'paid'">ຢືນຢັນການຈ່າຍເງິນ</v-btn>
            </div>
        </div>
    </div>
</template>
<script>
import swal from 'sweetalert2'
export default {

    data() {
        return {
            registration: {
                detail: {},
                invoice: [],
            },
            total: '',
            key: ''
        }
    },
    mounted() {

    },
    methods: {
        sumTotal(num) {
            if (!num) return null;
            return num.reduce((a, b) => a + b.price, 0)
        },
        onSearch(key) {
            try {
                this.$axios
                    .get('/registration/registration-detail/' + key)
                    .then((data) => {
                        this.registration = data?.data
                    })
            } catch (error) { }
        },
        onConfirm() {
            try {
                this.$axios
                    .put('/registration/complete/' + this.key)
                    .then((data) => {
                        swal.fire({
                            icon: 'success',
                            text: 'ສຳເລັດ'
                        })
                        this.onSearch(this.key)
                    })
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error
                })
            }
        }


    }
}
</script>
  