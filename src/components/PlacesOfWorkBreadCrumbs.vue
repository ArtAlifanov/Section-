<template>
  <div>
    <div
      v-for="placeOfWork in placesOfWork"
      :key="placeOfWork.id"
    >
      <v-breadcrumbs
        class="pl-0"
        :items="getPlacesOfWorkBreadCrumbsItems(placeOfWork)"
      />
    </div>
  </div>
</template>

<script>
  import {
    getPlacesOfWorkBreadCrumbsItems
  } from '@/utils'
  export default {
    name: 'PlacesOfWorkBreadCrumbs',
    props: {
      placesOfWork: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      getPlacesOfWorkBreadCrumbsItems(item) {
        // TODO: Find better way how to import utils into components
        return getPlacesOfWorkBreadCrumbsItems(item)
      }
    }
  }
</script>
