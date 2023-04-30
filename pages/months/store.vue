<template>
    <div>
        <div>
            <v-card width="800">
                <v-card-title>ຂໍ້ມູນເດືອນ</v-card-title>
                <v-card-text>
                    <div>
                        <v-text-field v-model="form.name" dense outlined label="ເດືອນເປັນພາສາລາວ"></v-text-field>
                        <v-text-field v-model="form.number" dense outlined label="ເດືອນເປັນຕົວເລກ"></v-text-field>
                    </div>
                    <v-btn @click="create">ເພີ່ມເດືອນ</v-btn>
                </v-card-text>
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
            form: {}
        }
    },
    methods: {
        create() {
            try {
                this.$axios.$post(`/manage/months`, this.form).then((data => {
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
        }
    }
}
</script>

<style></style>