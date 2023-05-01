<template>
    <div>
        <v-card width="1000" class="mx-auto" elevation="1">
            <v-card-text>
                <v-btn to="/months/store" color="primary" dense small>ເພີ່ມລາຍການ</v-btn>
                <v-data-table :items="list" :headers="headers" dense>
                    <template #[`item.actions`]="{ item }">
                        <v-btn small text color="error" @click="onDelete(item.id)">ລົບເດືອນ</v-btn>
                        <v-btn color="primary lighten-2" text small dark v-bind="attrs" v-on="on"
                            @click="addEditData(item)">
                            ແກ້ໄຂ
                        </v-btn>
                    </template>
                    
                </v-data-table>
            </v-card-text>
        </v-card>
        <v-dialog width="500" v-model="showDialogUp">
            <v-card>
                <v-card-title>ແກ້ໄຂ</v-card-title>
                <v-card-text>
                    <v-text-field v-model="form.name" dense outlined label="ເດືອນເປັນພາສາລາວ"></v-text-field>
                    <v-text-field v-model="form.number" dense outlined label="ເດືອນເປັນຕົວເລກ"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="showDialogUp = false">ປິດ</v-btn>
                    <v-btn color="primary" @click="_onUpdate">ບັນທຶກ</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            list: [],
            headers: [
                { text: 'ຊື່ເດືອນ', value: 'name' },
                { text: 'ເລກເດືອນ', value: 'number' },
                { text: 'ສ້າງຂື້ນ', value: 'createdAt' },
                { text: 'ຈັດການ', value: 'actions' },
            ],
            form: {
                name: '',
                number: '',
                key: ''
            },
            showDialogUp:false
        }
    },
    mounted() {
        this.get()
    },
    methods: {
        get() {
            try {
                this.$axios.$get('/manage/months').then((data) => {
                    this.list = data
                })
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error
                })
            }
        },
        async onDelete(id) {
            try {
                this.$axios.$delete('/manage/months/' + id).then((data) => {
                    this.get()
                })
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error
                })
            }
        },
        async addEditData(item) {
            this.form.name = item.name
            this.form.number = item.number
            this.key = item.id
            this.showDialogUp = true
        },
        async _onUpdate() {
            await this.$axios.$put('/manage/months/' + this.key, this.form).then((data) => {
                swal.fire({
                    icon: 'success',
                    text: 'ສຳເລັດ'
                })
                this.showDialogUp = false
                this.get()
            })
        }
    }
}
</script>