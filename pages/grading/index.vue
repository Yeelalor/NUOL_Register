<template>
    <div>
        <!-- <v-card class="pa-4">
            <div class="d-flex align-center">
                <v-btn color="primary" to="/teacher-course/create">ເພີ່ມ</v-btn>
                <v-card-title>ຂໍ້ມູນຈັດອາຈານສອນຕາມເວລາ</v-card-title>
            </div>
            <div style="display:flex;flex-direction:row">
                <div v-for="(item, index) in grade_list.studentScore" :key="index" class="d-flex align-center">
                    <span>{{ item?.name }}</span><br />
                </div>
                <div class="d-flex align-center" v-for="(item, index) in grade_list.subject" :key="index">
                    <span>{{ item?.name }}</span>
                </div>
            </div>
        </v-card> -->
        <v-card class="mt-5" flat>
            <v-simple-table>
                <thead>
                    <tr>
                        <th>ຊື່ ແລະ ນາມສະກຸນ</th>
                        <th v-for="(item, index) in grade_list.subject" :key="index">{{ item.name }}</th>
                        <th>ຄະແນນລວມ</th>
                        <th>ຄະແນນສະເລ່ຍ</th>
                        <th>ຈັດທີ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(student, index) in grade_list.studentScore" :key="index">
                        <td>{{ student.name }}</td>
                        <td v-for="(item, index) in grade_list.subject" :key="index">
                            {{ student.scores[item.subject] || '-' }}
                        </td>
                        <td>{{ student.total }}</td>
                        <td>{{ student.average }}</td>
                        <td>{{ student.ranking }}</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            grade_list: {
                subject: [],
                studentScore: []
            }
        }
    },
    mounted() {
        this.onGetGrading()
    },
    methods: {
        async onGetGrading() {
            try {
                await this.$axios
                    .$get(`/manage/display-score`, { params: { classId: 1, monthId: 1 } })
                    .then((data) => {
                        console.log("Year", data)
                        this.grade_list = data;
                    })
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error,
                })
            }
        }
    }
}
</script>