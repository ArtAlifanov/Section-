<template>
  <div class="f-form">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FForm',
  props: {
    background: {
      type: String,
      default: 'transparent'
    }
  },
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.f-form {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  height: fit-content;

  &__child {
    position: fixed;
    top: 75%;
    right: 0;
    left: 0;
    min-width: 360px;
    min-height: 70px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    width: fit-content;
    background-color: $darken-blue;
    z-index: 6;
  }
}
</style>