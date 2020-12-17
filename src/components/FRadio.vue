<template>
  <v-radio
    v-bind="$props"
    off-icon=""
    on-icon=""
    v-on="$listeners"
  />
</template>
<script>
import { VRadio } from 'vuetify/lib'
export default {
  name: 'FRadio',
  extends: VRadio
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';

::v-deep {
  .v-icon {
    border-radius: 50%;
    border: 1px solid $grey;
    &:after {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: $green;
      top: 5px;
      left: 5px;
    }
  }
  &.v-item--active {
    .v-icon {
      &:after {
        opacity: 1;
      }
    }
  }
  .v-label {
    font-size: 11px;
    color: $almost-black;
    text-transform: uppercase;
  }
  .v-input--selection-controls__input {
    width: 16px;
    height: 16px;
  }
  .v-input--selection-controls__ripple {
    height: 26px;
    width: 26px;
    top: calc(50% - 20px);
  }
}
</style>