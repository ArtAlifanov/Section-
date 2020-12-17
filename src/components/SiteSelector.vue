<template>
  <f-dropdown
    :loading="userSites.length === 0"
    :items="[{ id: null, name: $t('form.unselected') }, ...userSites]"
    :item-value="(item) => item.id"
    :item-text="(item) => item.name"
    :label="hideLabel ? '' : $t('title.object')"
    solo
    dense
    flat
    :hide-details="!isActiveDetails"
    append-icon="keyboard_arrow_down"
    :clearable="clearable"
    :value="selectedSite"
    class="site-selector"
    @input="updateSelectedSite"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex'

  export default {
    name: 'SiteSelector',
    components: {
      FDropdown: () => import('@/components/FDropdown')
    },
    props: {
      isActiveDetails: {
        type: Boolean,
        default: true
      },
      clearable: {
        type: Boolean,
        default: true,
      },
      hideLabel: {
        type: Boolean,
        default: false,
      }
    },
    computed: {
      ...mapState([
        'selectedSite',
        'userSites'
      ])
    },
    
    methods: {
      ...mapActions([
        'updateSelectedSite'
      ]),
    }
  }
</script>
