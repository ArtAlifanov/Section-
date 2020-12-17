<template>
  <v-app>
    <v-overlay
      z-index="50"
      :value="isLoading"
      opacity="0.1"
    >
      <v-progress-circular
        indeterminate
        size="128"
        color="primary"
      />
    </v-overlay>
    <Snackbar />
    <Toolbar v-if="authenticated" />
    <Navbar v-if="authenticated" />
    <v-content class="content-wrapper">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Toolbar from '@/views/Toolbar'
import Navbar from '@/views/Navbar'
import Snackbar from '@/components/Snackbar'

export default {
  name: 'App',

  components: { Toolbar, Navbar, Snackbar },

  computed: {
    ...mapState([
      'authenticated'
    ]),
    ...mapGetters([
      'isLoading'
    ]),
  },
}
</script>

<style lang="scss">
@import '@/styles/global.scss';
@import '@/styles/variables.scss';
.content-wrapper {
  background-color: $background;
}
</style>