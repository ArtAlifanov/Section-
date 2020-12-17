<template>
  <v-snackbar
    v-model="snackbar.visible"
    :color="snackbar.color"
  >
    {{ snackbar.text }}
    <v-btn
      dark
      text
      @click="closeSnackBar"
    >
      {{ $t("action.close") }}
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Snackbar',
    computed: {
      ...mapState(['snackbar']),
      ...mapGetters(['snackbarVisible'])
    },
    watch: {
      snackbarVisible(value) {
        if (value === false) {
          this.closeSnackBar()
        }
      }
    },
    methods: {
      ...mapActions(['closeSnackBar']),
    }
  }
</script>
