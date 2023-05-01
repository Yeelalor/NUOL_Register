<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-group :value="false" prepend-icon="mdi-hammer-wrench">
          <template v-slot:activator>
            <v-list-item-title style="margin-left: -20px"
              >ຈັດການຂໍ້ມູນພື້ນຖານ</v-list-item-title
            >
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :to="item.to"
            >
              <v-list-item-action>
                <v-icon light> {{ item.icon }} </v-icon>
              </v-list-item-action>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-list-group>
      </v-list>
      <v-list style="margin-top: -20px">
        <v-list-group :value="false" prepend-icon="mdi-book-open-blank-variant">
          <template v-slot:activator>
            <v-list-item-title style="margin-left: -20px">
              ຈັດການສອນ
            </v-list-item-title>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in tableList"
              :key="index"
              :to="item.to"
            >
              <v-list-item-action>
                <v-icon light> {{ item.icon }} </v-icon>
              </v-list-item-action>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-list-group>
      </v-list>
      <v-list style="margin-top: -20px">
        <v-list-group :value="false" prepend-icon="mdi-account-plus">
          <template v-slot:activator>
            <v-list-item-title style="margin-left: -20px"
              >ລົງທະບຽນ</v-list-item-title
            >
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in itemss"
              :key="index"
              :to="item.to"
            >
              <v-list-item-action>
                <v-icon light> {{ item.icon }} </v-icon>
              </v-list-item-action>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-list-group>
      </v-list>
      <v-list style="margin-top: -20px">
        <v-list-group :value="false" prepend-icon="mdi-school">
          <template v-slot:activator>
            <v-list-item-title style="margin-left: -20px">
              ປະເມີນຜົນ
            </v-list-item-title>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in elevationList"
              :key="index"
              :to="item.to"
            >
              <v-list-item-action>
                <v-icon light> {{ item.icon }} </v-icon>
              </v-list-item-action>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-list-group>
      </v-list>
     
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app elevation="0">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <h3>ລະບົບລົງທະບຽນຂອງໂຮງຮຽນ ມ.ສ ສາທິດ</h3>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: 'authAdmin',
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-human-male-board-poll',
          title: 'ຂໍ້ມູນອາຈານ',
          to: '/teachers/edit',
        },
        {
          icon: 'mdi-calendar-search-outline',
          title: 'ຂໍ້ມູນສົກຮຽນ',
          to: '/school-year',
        },
        {
          icon: 'mdi-calendar-month',
          title: 'ຂໍ້ມູນເດືອນ',
          to: '/months',
        },
        {
          icon: 'mdi-book-open-page-variant-outline',
          title: 'ຂໍ້ມູນວິຊາຮຽນ',
          to: '/subjects',
        },
        {
          icon: 'mdi-waves',
          title: 'ຂໍ້ມູນຊັ້ນຮຽນ',
          to: '/level',
        },
        {
          icon: 'mdi-greenhouse',
          title: 'ຂໍ້ມູນຫ້ອງຮຽນ',
          to: '/class/',
        },
        {
          icon: 'mdi-account-school',
          title: 'ຂໍ້ມູນນັກຮຽນ',
          to: '/inspire',
        },
      ],
      itemss: [
        {
          icon: 'mdi-book-open-variant',
          title: 'ລົງທະບຽນ',
          to: '/register',
        },
        {
          icon: 'mdi-credit-card-outline',
          title: 'ຈ່າຍຄ່າລົງທະບຽນ',
          to: '/payment',
        },
      ],
      elevationList: [
        {
          icon: 'mdi-book-open-variant',
          title: 'ບັນທຶກຄະແນນ',
          to: '/grading-save',
        },
        {
          icon: 'mdi-credit-card-outline',
          title: 'ອັນດັບທີ',
          to: '/grading',
        },
      ],
      tableList: [
        {
          icon: 'mdi-book-open-variant',
          title: 'ຈັດລາຍວິຊາເຂົ້າຫຼັກສູດ',
          to: '/course',
        },
        {
          icon: 'mdi-credit-card-outline',
          title: 'ຈັດອາຈານສອນຕາມລາຍວິຊາ',
          to: '/teacher-course',
        },
      ],

      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  },
}
</script>
<style>
.v-list-item .v-list-item__title,
.v-list-item .v-list-item__subtitle {
  line-height: 3 !important;
}
</style>
