<template>
  <div
    class="mb-4"
  >
    <v-card-title class="px-0">
      <div class="d-flex flex-1">
        <h3 class="headline px-2">
          {{ $t("title.attachments") }}
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                v-on="on"
              >
                info
              </v-icon>
            </template>
            <span>{{ $t("tooltip.attachments") }}</span>
          </v-tooltip>
        </h3>
        <div class="flex-grow-1" />
        <template v-if="!readonly">
          <v-btn
            v-if="$vuetify.breakpoint.smAndUp"
            color="teal"
            dark
            class="mb-2"
            @click="showUploadForm = true"
          >
            {{ $t("action.add-file") }}
          </v-btn>
          <f-button
            v-else
            color="teal"
            is-rounded
            icon="add"
            icon-size="24px"
            icon-color="white"
            class="mb-2 mr-2"
            @click="showUploadForm = true"
          />
        </template>
      </div>
    </v-card-title>
    <v-form
      v-if="!readonly && showUploadForm"
      ref="dbuploadForm"
      v-model="isUploadFormValid"
      autocomplete="off"
      @submit="handleUpload"
    >
      <v-card-text>
        <v-row align="center">
          <v-col>
            <v-file-input
              :rules="fileRules"
              :label="$t('text.daybook-attachments')"
              multiple
              :value="value"
              @change="handleDaybookAttachments"
            />
          </v-col>
          <v-col>
            <v-btn
              v-if="daybookId"
              small
              type="submit"
            >
              {{ $t("action.upload") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-form>
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
      <template v-slot:item.action="{ item }">
        <v-btn
          class="mr-2"
          small
          @click="downloadFile(item.id, item.fileName)"
        >
          {{ $t("action.download") }}
        </v-btn>
        <v-btn
          v-if="!readonly"
          small
          @click="deleteFile(item.id)"
        >
          {{ $t("action.delete") }}
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import {
    getDaybookAttachments,
    createAttachment,
    getAttachmentById,
    deleteAttachment
  } from '@/api/daybook.attachment.api'
  import FButton from '@/components/FButton'

  export default {
    name: 'DaybookAttachments',
    components: {
      FButton
    },
    props: {
      daybookId: {
        type: String,
        default: ''
      },
      readonly: {
        type: Boolean,
        default: false
      },
      value: {
        type: Array,
        default: () => []
      }
    },

    data: () => ({
      showUploadForm: false,
      files: [],
      isUploadFormValid: true
    }),
    computed: {
      fileRules() {
        return [
          v => !!v && v.length > 0 || this.$t('invalid.button-clicked-without-files')
        ]
      },
      headers() {
        return [
          { text: this.$t('table.fileName'), value: 'fileName', sortable: false },
          { text: this.$t('table.createdAt'), value: 'createdAt', sortable: false },
          { text: this.$t('table.action'), value: 'action', sortable: false },
        ]
      }
    },
    watch: {
      value() {
        this.$emit('input', this.value);
      }
    },
    mounted() {
      this.getFiles()
    },

    methods: {
      handleDaybookAttachments(value) {
        this.$emit('input', value);
      },
      async getFiles() {
        if (!this.daybookId) {
          return
        }
        const files = await getDaybookAttachments(this.daybookId)
        this.files = files.data ? files.data : []
      },
      async handleUpload(e) {
        e.preventDefault()
        if (!this.$refs.dbuploadForm.validate()) {
            return false
        }
        await createAttachment(this.daybookId, this.value)
        await this.getFiles()
        this.$refs.dbuploadForm.reset()

      },
      downloadFile(id, fileName) {
        getAttachmentById(this.daybookId, id, fileName)
      },
      async deleteFile(id) {
        await deleteAttachment(this.daybookId, id)
        this.getFiles()
      }
    }
  }
</script>
