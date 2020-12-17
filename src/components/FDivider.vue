<template>
  <v-divider :style="{'border-color': color}" />
</template>

<script>
export default {
  name: 'FDivider',
  props: {
    color: {
      type: String,
      default: '#D8DEDE'
    }
  }
}
</script>