<template>
  <div>
    <v-menu
      ref="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          :value="calendarValue ? calendarValue.join(' - ') : ''"
          :label="$t('select.range')"
          prepend-icon="event"
          :rules="[
            (v) => !required || !((v || '').length < 2) || $t('required.date')
          ]"
          readonly
          v-on="on"
        />
      </template>
      <v-date-picker
        v-bind="$props"
        reactive
        first-day-of-week="1"
        v-on="$listeners"
        @change="changeDates($event)"
      >
        <v-spacer />
        <v-btn
          text
          color="primary"
          @click="menu = false"
        >
          {{ $t("action.cancel") }}
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="$refs.menu.save(calendarValue)"
        >
          {{ $t("action.ok") }}
        </v-btn>
      </v-date-picker>
    </v-menu>
    <div class="f-calendar__options d-flex flex-wrap">
      <span
        v-for="(link, index) in calendarOptions"
        :key="index"
        class="f-calendar__option mr-7 mb-2"
        @click="changeDates(link.value)"
      >
        {{ $t(link.label) }}
      </span>
    </div>
  </div>
</template>

<script>
import { VDatePicker } from 'vuetify/lib'
import {
  getMonthRange,
  getWeekRange
} from '@/utils'

export default {
  name: 'FCalendar',
  extends: VDatePicker,
  props: {
    required: {
      type: Boolean,
      required: false
    }
  },
  data: () => ({
    calendarValue: [],
    isCurrentMonth: false,
    isPreviousMonth: false,
    isCurrentWeek: false,
    isPreviousWeek: false,
    currentMonthRange: [],
    previousMonthRange: [],
    currentWeekRange: []
  }),
  computed: {
    calendarOptions() {
      return [
        { label: 'date.current-week', value: this.currentWeekRange },
        { label: 'date.prev-week', value: this.previousWeekRange },
        { label: 'date.current-month', value: this.currentMonthRange },
        { label: 'date.prev-week', value: this.previousMonthRange }
      ]
    }
  },
  mounted() {
    this.currentMonthRange = getMonthRange(this.$moment)
    this.previousMonthRange = getMonthRange(this.$moment, 'previous')
    this.currentWeekRange = getWeekRange(this.$moment)
    this.previousWeekRange = getWeekRange(this.$moment, 'previous')
  },
  methods: {
    changeDates(preparedCalendarData) {
      this.calendarValue = this.fixDatesOrder(preparedCalendarData)
      this.$refs.menu.save(this.calendarValue)
      this.$emit('input', this.calendarValue)
    },
    fixDatesOrder(dates) {
      let arrayToSort = [...dates]
      arrayToSort.sort((a, b) => this.$moment(a).diff(this.$moment(b)))
      return arrayToSort
    },
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.f-calendar {

  &__option {
    font-size: 12px;
    cursor: pointer;
    color: $dark-grey;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
