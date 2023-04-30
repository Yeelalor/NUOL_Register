<template>
    <div>
        <v-btn to="/months/store" color="primary" dense small>ເພີ່ມລາຍການ</v-btn>
        <v-data-table :items="list" :headers="headers" dense>
            <template #[`item.actions`]="{ item }">
                <v-btn small text color="error" @click="onDelete(item.id)">ລົບເດືອນ</v-btn>
                <v-dialog  width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary lighten-2" text small dark v-bind="attrs" v-on="on" @click="addEditData(item)">
                            ແກ້ໄຂ
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title>ແກ້ໄຂ</v-card-title>
                        <v-card-text>
                            <v-text-field v-model="form.name" dense outlined label="ເດືອນເປັນພາສາລາວ"></v-text-field>
                            <v-text-field v-model="form.number" dense outlined label="ເດືອນເປັນຕົວເລກ"></v-text-field>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </template>
        </v-data-table>
    </div>
</template>
<script>
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
                number: ''
            }
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
        async addEditData(item){
            this.form.name = item.name
            this.form.number = item.number
        }
    }
}
</script>