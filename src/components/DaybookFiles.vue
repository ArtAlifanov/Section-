<template>
  <div
    v-if="files"
    class="mb-4"
  >
    <h3
      class="px-4"
      :class="$vuetify.breakpoint.smAndUp ? 'headline' : 'h3-title text-left pt-4'"
    >
      {{ $t("title.files-attached") }}
    </h3>
    <v-card-text class="px-0">
      <v-data-table
        :headers="headers"
        :items="files"
        :class="{
          'grey lighten-4': $vuetify.breakpoint.xs,
          'elevation-1': $vuetify.breakpoint.smAndUp
        }"
        hide-default-footer
        disable-pagination
      >
        <template v-slot:item.name="{ item }">
          {{ item.name }}
        </template>
        <template v-slot:item.size="{ item }">
          {{ item.size }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            small
            :loading="downloadableFileName === item.name"
            @click="downloadFile(item.resourcePath)"
          >
            {{ $t("action.download") }}
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </div>
</template>

<script>
  import {
    getDaybookDrawing
  } from '@/api/daybooks.api'
  export default {
    name: 'DaybookFiles',
    props: {
      files: {
        type: Array,
        default: () => []
      },
      daybookId: {
        type: String,
        default: ''
      }
    },

    data: () => ({
      downloadableFileName: ''
    }),
    computed: {
      headers() {
        return [
          { text: this.$t('form.file-name'), value: 'name', sortable: false },
          { text: this.$t('tables.size'), value: 'size', sortable: false },
          { text: this.$t('tables.action'), value: 'action', sortable: false },
        ]
      }
    },
    methods: {
      downloadFile (fileName) {
        this.downloadableFileName = fileName
        getDaybookDrawing(this.daybookId, fileName)
        .catch(() => {
          // error
        })
        .then(() => {
          // always
          this.downloadableFileName = ''
        })
      },
    }
  }
</script>

<style lang="scss">
.v-data-table-header-mobile {
  @media (max-width: 600px) {
    display: none;
  }
}
</style>
