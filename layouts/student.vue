<template>
    <v-app>
        <v-app-bar   fixed app>
            <h3>ໂຮງຮຽນມັດທະຍົມສຶກສາສົມບູນສາທິດ</h3>
            <v-spacer></v-spacer>
            <v-btn elevation="0">ກ່ຽວກັບພວກເຮົາ</v-btn>
            <v-btn elevation="0" to="/student/login">ເຂົ້າສູ້ລະບົບ</v-btn>
        </v-app-bar>
        <v-main>
            <Nuxt />
        </v-main>
    </v-app>
</template>