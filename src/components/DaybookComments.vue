<template>
  <v-form
    v-show="areCommentsVisible"
    v-if="author"
    ref="formRef"
    v-model="valid"
    @submit="comment"
    autocomplete="off"
  >
    <v-timeline
      dense
      clipped
    >
      <v-timeline-item
        fill-dot
        class="white--text mb-12"
        color="orange"
        large
      >
        <template v-slot:icon>
          <span>{{ initials }}</span>
        </template>
        <v-textarea
          ref="textareaRef"
          v-model="input"
          :label="$t('text.leave-comment')"
          solo
          auto-grow
          :loading="isSubmitting"
          :rules="commentRules"
          :counter="200"
          required
        >
          <template v-slot:append>
            <v-btn
              type="submit"
              class="mx-0"
              depressed
              :disabled="isSubmitting"
            >
              {{ $t("action.submit") }}
            </v-btn>
          </template>
        </v-textarea>
      </v-timeline-item>
      <div
        v-show="isLoading"
        class="text-center mb-12"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </div>
      <v-slide-x-transition
        group
      >
        <v-timeline-item
          v-for="(timelineItem) in timeline"
          :key="timelineItem.id"
          class="mb-4"
          color="orange"
          small
        >
          <v-card>
            <v-progress-linear
              v-show="isSubmitting"
              :indeterminate="true"
              height="2"
            />
            <v-card-title primary-title>
              <v-row>
                <v-col>
                  <div class="grey--text">
                    {{ timelineItem.author }}
                  </div>
                </v-col>
                <v-col>
                  <div class="grey--text">
                    {{ timelineItem.date }}
                  </div>
                </v-col>                      
              </v-row>
            </v-card-title>
            <v-card-text>
              {{ timelineItem.text }}
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-slide-x-transition>
    </v-timeline>
  </v-form>
</template>

<script>
  import { APIService } from '@/api/APIService'
  const apiService = new APIService()

  export default {
    name: 'DaybookComments',
    props: {
      author: {
        type: Object,
        required: true
      },
      daybookId: {
        type: String,
        required: true
      }
    },

    data: () => ({
      comments: [],
      input: null,
      isLoading: false,
      isSubmitting: false,
      valid: false,
      areCommentsVisible: false
    }),

    computed: {
      commentRules() {
        return [
          v => !!v || this.$t('required.comment'),
          v => (v && v.length <= 200) || this.$t('invalid.comment.toolong')
        ]
      },
      timeline () {
        return this.comments.slice().reverse()
      },
      initials () {
        if (this.author && this.author.firstName) {
          return [this.author.firstName, this.author.lastName].map((item) => item.charAt(0)).join('')
        }
        return '...'
      }
    },

    mounted () {
      this.getComments()
    },

    methods: {
      getComments () {
        if (this.comments.length === 0) {
          this.isLoading = true
        }
        apiService.getDaybookComments(this.daybookId)
        .then((response) => {
          if (response.data) {
            this.comments = response.data.map(((item, index) => ({
              ...item,
              id: index + 1
            })))
          }
          this.isLoading = false
          this.areCommentsVisible = true
        })
        .catch(() => {})
      },
      comment (e) {
        e.preventDefault()
        if (!this.$refs.formRef.validate()) {
          return false
        }
        const date = this.$moment().format('L')
        const time = this.$moment().format('LT')
        this.comments.push({
          id: this.comments.length + 1,
          date: `${date} ${time}`,
          text: this.input,
          author: this.author.fullname
        })
        this.isSubmitting = true
        apiService.postDaybookComment({
          daybookId: this.daybookId,
          text: this.input,
          userId: this.author.id
        })
        .then(() => {
          this.$refs.formRef.reset()
          this.$refs.textareaRef.blur()
          this.isSubmitting = false
          this.getComments()
        })
        .catch(() => {
          this.isSubmitting = false
        })
        return true
      }
    }
  }
</script>
