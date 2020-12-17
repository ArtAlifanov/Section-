<template>
  <v-navigation-drawer
    v-model="isNotificationDialogVisible"
    hide-overlay
    :right="true"
    :color="colors.heavenBlue"
    temporary
    :style="{'height': 'fit-content', 'box-shadow': '0px 0px 20px rgba(42, 55, 86, 0.3)'}"
    class="f-notifications-popup px-3 py-3"
  >
    <div class="d-flex justify-space-between align-center mb-5">
      <h3 class="f-notifications-popup__title font-weight-medium">
        {{ $t("title.notifications") }}
      </h3>
      <a
        class="f-notifications-popup__link"
        :style="{'color': colors.blue}"
        @click="toNotificationsPage"
      >
        {{ $t("title.view-all") }}
      </a>
    </div>
    <div v-if="notifications.length">
      <div
        v-for="(notification, index) in notifications"
        :key="notification.id"
        class="f-notifications-popup__item py-2"
        @click="toSourcePage(notification)"
      >
        <div>
          {{ $t(`notifications.${notification.notificationType}`) }}
        </div>
        <div class="f-notifications-popup__item-date mb-1">
          {{ $t("title.created") }}: {{ $moment(notification.createdAt).format('YYYY-MM-DD') }}
        </div>
        <div
          v-if="index !== notifications.length -1"
          class="f-notifications-popup__hr"
        />
      </div>
    </div>
    <div
      v-else
      :style="{'min-height': '60px'}"
      class="d-flex justify-center align-center"
    >
      {{ $t("text.notif-absent") }}
    </div>
  </v-navigation-drawer>
</template>

<script>
import colors from '@/styles/colors'
import { toSourcePage } from '@/utils'

export default {
  name: 'FNotificationsPopup',
  model: {
    prop: 'isNotificationDialogVisible',
    event: 'click'
  },
  props: {
    notifications: {
      type: Array,
      default: () => []
    },
    isNotificationDialogVisible: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    model: {
      get() {
        return this.isNotificationDialogVisible
      },
      set(val) {
        this.$emit('click', val)
      },
    },
  },
  watch: {
    isNotificationDialogVisible(isNotificationDialogVisible) {
      this.$emit('toggle-dialog', isNotificationDialogVisible);
    }
  },
  created() {
    this.colors = colors
  },
  methods: {
    toNotificationsPage() {
      this.$router.push({
        name: 'notifications'
      })
    },
    toSourcePage(notification) { // to see vue-router in js file
      toSourcePage(notification, this.$router)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.f-notifications-popup {
  position: absolute;
  top: 65px !important;
  max-width: 300px;
  max-height: 620px;
  width: 300px;
  overflow: auto;
  z-index: 1;
  font-size: 11px;
  background-color: $heaven-blue;

  .v-navigation-drawer__content {
    height: fit-content;
  }

  &__item {
    cursor: pointer;
    text-overflow: ellipsis;

    &:hover {
      background-color: $background;
      transition: 0.5s;
    }
  }

  &__item-date {
    font-size: 12px;
    color: $dark-grey;
  }

  &__title {
    font-size: 22px;
  }

  &__link {
    text-decoration: none;
  }

  &__hr {
    height: 1px;
    background-color: $grey;
  }
}
</style>
