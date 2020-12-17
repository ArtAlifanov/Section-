<template>
  <v-slide-group
    v-bind="$props"
    v-on="$listeners"
  >
    <template v-slot:prev="{ on }">
      <f-button
        icon="left"
        min-width="24"
        max-height="24"
        without-padding
        icon-color="white"
        :color="colors.blue"
        class="mr-5"
        v-on="on"
      />
    </template>
    <slot />
    <template v-slot:next="{ on }">
      <f-button
        icon="right"
        min-width="24"
        max-height="24"
        without-padding
        icon-color="white"
        :color="colors.blue"
        class="mr-5"
        v-on="on"
      />
    </template>
  </v-slide-group>
</template>

<script>
import { VSlideGroup } from 'vuetify/lib'
import FButton from '@/components/FButton'
import colors from '@/styles/colors.js'

export default {
  name: 'FSlideGroup',
  components: {
    FButton,
  },
  extends: VSlideGroup,
  created() {
    this.colors = colors
  },
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.f-slide-group {
  &__profile-icon {
    width: 30px;
    height: 30px;
    border: 1px solid $darken-blue;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__card {
    width: 140px;
    height: 100px;
    font-size: 14px;

    &:first-child {
      margin-left: 0 !important;
    }
  }

  &__role {
    font-size: 12px;
    color: $dark-grey;
  }

  &__diliver {
    height: 1px;
    width: 20px;
    background-color: $dark-yellow;
  }
}
</style>