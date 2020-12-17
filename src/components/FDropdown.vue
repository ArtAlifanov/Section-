<template>
  <div class="f-dropdown d-flex align-center">
    <span
      v-if="label"
      class="f-dropdown__label mr-2 font-weight-bold text-uppercase"
    >
      {{ label }}
    </span>
    <v-col cols="auto" class="pa-0">
      <v-select
        hide-details
        v-bind="$props"
        single-line
        append-icon="keyboard_arrow_down"
        class="f-dropdown__select pt-0"
        v-on="$listeners"
        :menu-props="{
          auto: true,
        }"
      />
    </v-col>
  </div>
</template>

<script>
import { VSelect } from 'vuetify/lib'
export default {
  name: 'FDropdown',
  extends: VSelect
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.f-dropdown {
  &__label {
    font-size: 11px;
  }

  .v-input__slot {
    border: 1px solid $grey;
    padding: 3px 10px 3px 16px;
    border-radius: 5px;

    &:before {
      border: none !important;
    }

    .v-icon {
      color: $dark-blue;
    }
  }

  .v-select__selection {
    font-size: 11px;
    text-transform: uppercase;
  }
  
  /*
    v-select auto width depending of content
    Check for status update here
    https://github.com/vuetifyjs/vuetify/issues/6275
  */
  .v-select.v-input--is-dirty input {
    width: 0;
  }
  .v-select__slot {
    /*
      Vuetify sometimes adds
      width in pixels.
    */
    width: 100%;
  }
  .v-select__selections input {
    width: 0;
  }
  .v-select__selection {
    max-width: none;
  }
  .v-text-field .v-select__slot .v-select__selection--comma {
    min-width: min-content;
  }
  .v-select {
    min-width: min-content;
  }
}

</style>