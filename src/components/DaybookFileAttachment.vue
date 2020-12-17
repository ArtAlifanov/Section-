<template>
  <v-container>
    <v-data-table
      :headers="[
        {
          text: '',
          align: 'left',
          sortable: false,
          value: 'resourcePath'
        },
        {
          text: '',
          align: 'right',
          sortable: false,
          value: 'actions'
        },
      ]"
      :items="daybook.resourceDescriptions"
      hide-default-footer
      class="elevation-2"
      disable-pagination
    >
      <template v-slot:top>
        <v-toolbar
          flat
          color="white"
        >
          <h3 class="headline my-6">
            {{ $t("title.owncloud-drawings") }}
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="primary"
                  v-on="on"
                >
                  info
                </v-icon>
              </template>
              <span>{{ $t("tooltip.select-drawing") }}</span>
            </v-tooltip>
          </h3>
          <div class="flex-grow-1" />
          <v-dialog
            v-model="filesDialog"
            max-width="1000px"
            scrollable
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="teal"
                dark
                class="mb-2"
                v-on="on"
              >
                {{ $t("action.add-file") }}
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                {{ $t("action.add-file") }}
                <v-btn
                  text
                  @click="openAll(true)"
                >
                  {{ $t("title.expand-all") }}
                </v-btn>
                <v-btn
                  text
                  @click="openAll(false)"
                >
                  {{ $t("title.collapse-all") }}
                </v-btn>
                <v-text-field
                  v-model="filesSearch"
                  dense
                  :label="$t('title.search-files')"
                  clearable
                  outlined
                  hide-details
                />
              </v-card-title>
              <v-divider />
              <v-card-text style="height: 500px;">
                <v-row>
                  <v-col
                    md="8"
                    cols="12"
                  >
                    <v-treeview
                      v-if="owncloudResourcesTree.length > 0"
                      ref="treeview"
                      v-model="daybook.resourceDescriptions"
                      :search="filesSearch"
                      :open="open"
                      :items="owncloudResourcesTree"
                      return-object
                      item-key="resourcePath"
                      open-on-click
                      selectable
                      transition
                      hoverable
                    >
                      <template v-slot:prepend="{ item, open }">
                        <v-icon v-if="item.children">
                          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                        </v-icon>
                        <v-icon v-else>
                          attachment
                        </v-icon>
                      </template>
                      <template v-slot:label="{ item }">
                        {{ item.name }} {{ item.size ? `(${item.size})` : '' }}
                      </template>
                    </v-treeview>
                  </v-col>
                  <v-divider vertical />
                  <v-col>
                    <v-data-table
                      style="position:sticky;top: 12px;"
                      dense
                      disable-pagination
                      hide-default-header
                      hide-default-footer
                      :items-per-page="5"

                      :headers="[
                        {
                          text: '',
                          align: 'left',
                          sortable: false,
                          value: 'name'
                        },

                      ]"
                      :items="daybook.resourceDescriptions"
                    >
                      <template v-slot:no-data>
                        {{ $t("title.select-owncloud") }}
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="filesDialog = false"
                >
                  {{ $t("action.close") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.resourcePath="{item}">
        <v-breadcrumbs
          class="pl-0"
          :items="item.resourcePath.split('/').map((item) => ({ text: item }))"
        >
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </template>
      <template v-slot:item.actions="{item}">
        <v-icon
          small
          @click="removeFileFromDaybook(item.resourcePath)"
        >
          delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        {{ $t("text.no-ownclouds-added") }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'DaybookFileAttachment',

    props: {
      owncloudResourcesTree: {
        type: Array,
        default: () => []
      },
      daybook: {
        type: Object,
        default: () => {}
      },
    },

    data: () => ({
      open: [],
      filesDialog: false,
      filesSearch: '',
      filesTableHeaders: [
        {
          text: '',
          align: 'left',
          sortable: false,
          value: 'task'
        },
        {
          text: '',
          value: 'task',
          sortable: false,
          align: 'center'
        }
      ],
    }),

    methods: {
      removeFileFromDaybook(resourcePath) {
        const files = this.daybook.resourceDescriptions.filter(task => task.resourcePath !== resourcePath)
        this.daybook.resourceDescriptions = files
      },
      openAll(state) {
        this.$refs.treeview.updateAll(state)
      }
    }
  }
</script>
