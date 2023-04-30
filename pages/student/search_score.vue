<template>
    <div>
        <v-container>
            <v-card>
                <v-card-title>ຄົ້ນຫາຄະແນນ</v-card-title>
                <v-card-text> 
                    <v-container>
                        <v-row dense>
                            <v-col cols="4">
                                <v-text-field dense outlined label="ເລືອກສົກຮຽນ"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field dense outlined label="ເລືອກເດືອນ"></v-text-field>
                            </v-col><v-col cols="4">
                                <v-btn color="primary">ຄົ້ນຫາ</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
    layout: 'student'
}
</script>

