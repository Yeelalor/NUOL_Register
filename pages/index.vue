<template>
  <div>
    <v-container class="pt-10">
      <v-carousel style="border-radius:10px" hide-delimiters>
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src"></v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>
<script>
export default {
  layout: 'student',
  data() {
    return {
      items: [
        {
          src: 'https://scontent-sin6-2.xx.fbcdn.net/v/t31.18172-8/17547039_727159964130067_7364958087436748379_o.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9267fe&_nc_ohc=ytAvM5aS4o4AX-67kkT&_nc_ht=scontent-sin6-2.xx&oh=00_AfAXcAUU9znGMdD7voioowll9b4ukNbx5z5a6zoHv55Dkg&oe=647B2665',
        },
        {
          src: 'https://scontent-sin6-2.xx.fbcdn.net/v/t31.18172-8/17436171_724540677725329_1374391293612731464_o.jpg?_nc_cat=108&ccb=1-7&_nc_sid=730e14&_nc_ohc=KM2JFM6EAYgAX-HgYOj&_nc_ht=scontent-sin6-2.xx&oh=00_AfBpaakpAgQTscKs7K9Ls9gtTJFsm0zKB2rLwgPuwZ07WQ&oe=647B26A9',
        },
      ],
    }
  }
}

</script>