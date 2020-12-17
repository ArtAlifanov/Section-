<template>
  <v-radio-group
    v-bind="$props"
    v-on="$listeners"
  >
    <f-radio 
      v-for="(item, index) in elements"
      :key="index"
      v-bind="item"
    />
  </v-radio-group>
</template>

<script>
import { VRadioGroup } from 'vuetify/lib'
import FRadio from '@/components/FRadio'
export default {
  name: 'FRadioGroup',
  components: {
    FRadio
  },
  extends: VRadioGroup,  
  props: {
    elements: {
      type: Array,
      default: () => []
    }
  }
}
</script>