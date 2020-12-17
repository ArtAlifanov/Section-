<template>
  <div class="f-treeview">
    <div 
      v-for="(item, index) in formattedItem" 
      :key="index"
      :style="{'margin-left': `${index * 24}px`}"
    >
      <span 
        v-if="index > 0"
        class="f-treeview__divider"  
      >
        &#8735;
      </span>
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FTreeview',
  props: {
    data: {
      type: String,
      default: ''
    }
  },
  computed: {
    formattedItem() {
      return this.data.split(' / ')
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.f-treeview {
  margin: 20px 0;

  &__divider {
    font-size: 32px;
    color: $grey;
  }
}
</style>