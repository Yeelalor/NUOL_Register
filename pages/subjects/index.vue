<template>
    <div class="pt-4">
        <v-card width="800">
            <v-card-text>
                <div style="display:flex;">
                    <div style="width:400px">
                        <v-text-field dense outlined v-model="form.name" label="ຊື່ວີຊາຮຽນ" class="mx-4"></v-text-field>
                    </div>
                    <v-btn color="primary" @click="_onInsert">ບັນທຶກ</v-btn>
                </div>
                <v-data-table :items="list" :headers="headers" dense>
                    <template #[`item.actions`]="{ item }">
                        <v-btn color="primary" small dark v-bind="attrs" v-on="on" @click="_onGetForUp(item.name,item.id)">
                            ແກ້ໄຂ
                        </v-btn>
                        <v-btn small color="error" @click="onDelete(item.id)">ລົບ</v-btn>
                    </template>
                    <template #[`item.index`]="{ index }">
                        {{ index + 1 }}
                    </template>

                </v-data-table>
            </v-card-text>
        </v-card>
        <v-dialog width="500" v-model="showDialogUp">
            <v-card>
                <v-card-title>ແກ້ໄຂ</v-card-title>
                <v-card-text>
                    <v-text-field v-model="form.name" dense outlined label="ຊື່ວິຊາຮຽນ"></v-text-field>
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
                { text: 'ລຳດັບ', value: 'index' },
                { text: 'ຊື່ວິຊາຮຽນ', value: 'name' },
                { text: 'ຈັດການ', value: 'actions' },
            ],
            form: {
                name: '',
                key:''
            },
            showDialogUp: false
        }
    },
    mounted() {
        this._onGet()
    },
    methods: {
        async _onGetForUp(name,id){
            this.form.name = name;
            this.form.key = id;
            this.showDialogUp = true
        },
        async _onGet() {
            try {
                await this.$axios.$get('/manage/subjects').then((data) => {
                    this.list = data
                    console.log(data)
                    
                })
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error
                })
            }
        },
        async _onInsert() {
            try {
                await this.$axios.$post('/manage/subjects', this.form).then(() => {
                    swal.fire({
                        icon: 'success',
                        text: 'ສຳເລັດ'
                    })
                    this._onGet()
                    this.form.name = ''
                })
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error
                })
            }
        },
        async _onUpdate() {
            try {
                await this.$axios.$put(`/manage/subjects/${this.form.key}`, this.form).then(() => {
                    swal.fire({
                        icon: 'success',
                        text: 'ສຳເລັດ'
                    })
                    this._onGet()
                    this.form.name = '';
                    this.showDialogUp = false
                })
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error
                })
            }
        },
        async onDelete(item) {
            this.form.key = item;
            try {
                await this.$axios.$delete(`/manage/subjects/${this.form.key}`, this.form).then(() => {
                    swal.fire({
                        icon: 'success',
                        text: 'ສຳເລັດ'
                    })
                    this._onGet()
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