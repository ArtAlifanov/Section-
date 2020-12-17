
<template>
  <v-tabs 
    v-model="activeTab"
    :style="{'height': '50px'}"
    class="f-tabs" 
  >
    <v-tab 
      v-for="(tab, index) in tabs" 
      :key="index"
      @click="changeActiveTab(index)"
    >
      <v-badge
        v-if="tab.badge"
        color="red"
        inline
        :content="tab.badge"
        :value="tab.badge"
      />
      {{ tab.tabName }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'FTabs',
  props: {
    tabs: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data: () => ({
    activeTab: 0
  }),
  methods: {
    changeActiveTab(index) {
      this.$emit('change-tab', index)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.f-tabs {
  .v-slide-group__content::after {
    position: absolute;
    content: "";
    width: 100%;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid $dark-blue;
    z-index: 1;
  }

  .v-slide-group__content::before {
    z-index: 1;
  }

  .v-tab {
    position: relative;
    z-index: 0;
    border: 1px solid $grey;
    border-radius: 5px 5px 0 0;
    font-size: 12px;
    font-weight: 700;
  }

  .v-badge__badge {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 13px;
    font-size: 8px;
  }

  .v-tab--active {
    z-index: 2;
    border-color: $dark-blue;
    border-bottom-color: #fff;
    color: $darken-blue;

    &::after {
      position: absolute;
      content: "";
      width: 100%;
      bottom: 0;
      left: 0;
      border-bottom: 1px solid #fff;
      z-index: 2;
    }
  }
}
</style>