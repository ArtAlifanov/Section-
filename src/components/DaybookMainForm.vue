<template>
  <v-container>
    <v-row>
      <v-col
        xs="12"
        md="4"
        cols="12"
      >
        <v-text-field
          v-model="daybook.company"
          disabled
          :label="$t('title.company')"
          outlined
        />
      </v-col>

      <v-col
        cols="12"
        xs="12"
        md="4"
      >
        <v-text-field
          v-model="site.name"
          disabled
          outlined
          :label="$t('title.site-name')"
        />
      </v-col>

      <v-col
        v-if="!isBatchModeActive"
        cols="12"
        xs="12"
        md="4"
      >
        <v-text-field
          v-model="daybook.date"
          disabled
          outlined
          :label="$t('date.date')"
        />
      </v-col>

      <v-col
        cols="12"
        xs="12"
      >
        <v-divider class="mb-6 " />
      </v-col>


      <v-col
        v-if="!isBatchModeActive"
        cols="12"
        xs="12"
        md="6"
      >
        <v-text-field
          v-model="daybookEmployeeFullname"
          disabled
          outlined
          :label="$t('title.elect-name')"
        />
      </v-col>

      <v-col
        cols="12"
        xs="12"
        md="6"
      >
        <v-text-field
          v-model="daybookSiteManagerFullname"
          disabled
          outlined
          :label="$t('title.site-manage')"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DaybookMainForm',

    props: {
      isBatchModeActive: {
        type: Boolean,
        default: false
      },
      daybookEmployeeFullname: {
        type: String,
        default: ''
      },
      daybookSiteManagerFullname: {
        type: String,
        default: ''
      },
      daybook: {
        type: Object,
        default: () => {}
      },
      site: {
        type: Object,
        default: () => {}
      },
      editable: {
        type: Boolean,
        default: false
      },
    },
  }
</script>
