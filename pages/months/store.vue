<template>
    <div class="pt-4">
        <div>
            <v-card width="500" class="mx-auto">
                <v-card-title>ຂໍ້ມູນເດືອນ</v-card-title>
                <v-card-text>
                    <div>
                        <v-text-field v-model="form.name" dense outlined label="ເດືອນເປັນພາສາລາວ"></v-text-field>
                        <v-text-field v-model="form.number" dense outlined label="ເດືອນເປັນຕົວເລກ"></v-text-field>
                    </div>

                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="create" small color="primary">ເພີ່ມເດືອນ</v-btn>
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