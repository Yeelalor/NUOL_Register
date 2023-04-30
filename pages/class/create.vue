<template>
    <div class="pt-4">
        <div>
            <v-card width="500" flat>
                <v-btn class="mx-2" fab dark small color="primary" to="/class">
                    <v-icon dark>
                        mdi-arrow-left
                    </v-icon>
                </v-btn>
                <v-card-title>ຂໍ້ມູນເດືອນ</v-card-title>
                <v-card-text>
                    <div>
                        <v-text-field v-model="form.name" dense outlined label="ຊື່ຫ້ອງຮຽນ"></v-text-field>
                        <v-select v-model="form.schoolYear" :items="yearList" item-text="name" item-value="id" dense
                            outlined label="ເລືອກສົກຮຽນ"></v-select>
                        <v-select v-model="form.level" :items="levelList" item-text="name" item-value="id" dense outlined
                            label="ເລືອກຊັ້ນຮຽນ"></v-select>
                    </div>

                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="create" color="primary">ເພີ່ມ</v-btn>
                    <v-spacer></v-spacer>

                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            month_heads: [
                { text: '', value: 'index' },
                { text: 'ຊື່ພາສາລາວ', value: 'name' },
                { text: 'ເດືອນເລກ', value: 'number' }
            ],
            month_data_list: [],
            form: {},
            yearList: [],
            levelList: []
        }
    },
    mounted() {
        this._onGet();
        this._onGetLevel()
    },
    methods: {
        create() {
            try {
                if (!this.form.name || !this.form.schoolYear || !this.form.level) {
                    swal.fire({ icon: 'warning', text: 'ກະລຸນາປ້ອນຂໍ້ມູນ' })
                    return null;
                }

                this.$axios.$post(`/manage/class`, this.form).then((data => {
                    swal.fire({
                        icon: 'success',
                        text: 'ສຳເລັດ'
                    })
                    this.$router.go(-1)
                }))
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error
                })
            }
        },
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

<style></style>