<template>
    <div>
        <v-card flat>
            <v-toolbar flat>
                <div style="padding-bottom:20px;padding-top:20px;width:100%">ລົງທະບຽນ
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
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-card>ລົງທະບຽນ</v-card>
                    <v-card>
                        <v-card-title>ຂໍ້ມູນລົງທະບຽນ</v-card-title>
                        <v-card-text>

                        </v-card-text>
                    </v-card>
                    <v-card>
                        <v-card-title>ຂໍ້ມູນລົງທະບຽນ</v-card-title>
                        <v-card-text>

                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card>
                        <v-card-text>
                            <v-card flat>
                                <v-card-title>ຂໍ້ມູນນັກຮຽນ</v-card-title>
                                <v-card-text>
                                    <v-row dense>
                                        <v-col cols="12" md="4" sm="4">
                                            <v-text-field outlined dense label="ຊື່"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4" sm="4">
                                            <v-text-field outlined dense label="ນາມສະກຸນ"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4" sm="4">
                                            <v-text-field outlined dense label="ເພດ"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row dense>
                                        <v-col cols="12" md="4" sm="4">
                                            <v-text-field outlined dense label="ວັນເດືອນປີເກີດ"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4" sm="4">
                                            <v-text-field outlined dense label="ທີ່ຢູ່ບ້ານເກີດ"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4" sm="4">
                                            <v-text-field outlined dense label="ທີ່ຢູ່ປະຈຸບັນ"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row dense>
                                        <v-col cols="12" md="4" sm="4">
                                            <v-text-field outlined dense label="ຊົນເຜົ່າ"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4" sm="4">
                                            <v-text-field outlined dense label="ສະຖານະ"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4" sm="4">
                                            <v-text-field outlined dense label="ເລືອກຮູບ"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row dense>
                                        <v-col cols="12" md="4" sm="4">
                                            <v-text-field outlined dense label="ຜູ້ປົກຄອງ"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4" sm="4">
                                            <v-text-field outlined dense label="ອາຊີບຜູ້ປົກຄອງ"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4" sm="4">
                                            <v-text-field outlined dense label="ເບີໂທ"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row dense>
                                        <v-col cols="12" md="4" sm="4">
                                            <v-select v-model="form.schoolYear" :items="yearList" item-text="name"
                                                item-value="id" dense outlined label="ເລືອກສົກຮຽນ"></v-select>
                                        </v-col>
                                        <v-col cols="12" md="4" sm="4">
                                            <v-select v-model="form.level" :items="levelList" item-text="name"
                                                item-value="id" dense outlined label="ເລືອກຊັ້ນຮຽນ"></v-select>
                                        </v-col>
                                        <v-col cols="12" md="4" sm="4">
                                            <v-text-field outlined dense label="ເບີໂທ"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                            <v-card flat>
                                <v-card-title>ຂໍ້ມູນຫ້ອງຮຽນ</v-card-title>
                                <v-card-text>

                                </v-card-text>
                            </v-card>
                            <v-card flat>
                                <v-card-title>ຄ່າທຳນຽມຕ່າງໆ</v-card-title>
                                <v-card-text>

                                </v-card-text>
                            </v-card>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            tab: null,
            items: [
                'ນັກຮຽນເກົ່າ', 'ນັກຮຽນໃໝ່',
            ],
            yearList: [],
            levelList: [],
            form: {}
        }
    },
    mounted() {
        this._onGet();
        this._onGetLevel()
    },
    methods: {
        async _onGet() {
            try {
                await this.$axios.$get('/manage/school-year').then((data) => {
                    console.log(data)
                    this.yearList = data

                })
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error
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
                    text: error
                })
            }
        },
    }
}
</script>