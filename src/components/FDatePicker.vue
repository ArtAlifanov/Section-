<template>
  <div
    :style="{ 'width': $vuetify.breakpoint.xs ? '100%' :`${width}px` }"
    class="d-flex justify-center align-center f-date-picker"
  >
    <f-button
      v-if="withArrows"
      icon="left"
      min-width="24"
      max-height="24"
      without-padding
      :color="colorBackArrow"
      :disabled="isDisabledPrev"
      icon-color="white"
      class="mr-5"
      @click.native="changeSelectedWeekIndex('back')"
    />
    <f-button
      v-if="withArrows"
      icon="right"
      min-width="24"
      max-height="24"
      without-padding
      :disabled="isDisabledNext"
      :color="colorForwardArrow"
      icon-color="white"
      class="mr-5"
      @click.native="changeSelectedWeekIndex('forward')"
    />
    <f-dropdown
      v-if="pickerKind === 'year'"
      v-model="year"
      :items="uppercasedDateList"
      hide-details
      solo
      flat
      class="ml-5 f-date-picker__text"
      @input="onDropdownChange"
    />
    <f-dropdown
      v-if="pickerKind === 'week'"
      v-model="week"
      :items="uppercasedDateList"
      hide-details
      solo
      flat
      class="mx-2 f-date-picker__text"
      @input="onDropdownChange"
    />
  </div>
</template>

<script>
import colors from '@/styles/colors.js'

export default {
  name: 'FDatePicker',
  components: {
    FDropdown: () => import('@/components/FDropdown'),
    FButton: () => import('@/components/FButton')
  },
  props: {
    pickerKind: {
      type: String,
      required: true
    },
    dateList: {
      type: Array,
      default: () => []
    },
    selectedWeekIndex: {
      type: Number,
      default: null
    },
    maxSelectedWeekIndex: {
      type: Number,
      default: null
    },
    width: {
      type: [Number, String],
      default: 300
    },
    withArrows: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    week: null,
    year: null,
    colors: {},
  }),
  computed: {
    isDisabledPrev() {
      return this.selectedWeekIndex === 0
    },
    isDisabledNext() {
      return this.selectedWeekIndex === this.maxSelectedWeekIndex - 1
    },
    colorBackArrow() {
      return this.isDisabledPrev ? this.colors.grey : this.colors.blue
    },
    colorForwardArrow() {
      return this.isDisabledNext ? this.colors.grey : this.colors.blue
    },
    uppercasedDateList() {
      return this.dateList.map(item => {
        return { ...item, text: item.text.toUpperCase() }
      })
    }
  },
  watch: {
    $route(newValue) {
      this.week = newValue.params.week
      this.year = newValue.params.year
    },
  },
  created() {
    this.colors = colors
  },
  mounted() {
    const { week, year } = this.$route.params

    this.week = Number(week)
    this.year = Number(year)
  },
  methods: {
    changeSelectedWeekIndex(way) {
      way === 'back' ? this.selectedWeekIndex-- : this.selectedWeekIndex++
      this.sendWeekValue()
    },
    onDropdownChange() {
      if (this.pickerKind === 'week') {
        this.sendWeekValue()
      }
      if (this.pickerKind === 'year') {
        this.sendYearValue()
      }
    },
    sendWeekValue() {
      const data = {
        week: this.week,
        selectedWeekIndex: this.selectedWeekIndex
      }

      this.$emit('change-week', data)
    },
    sendYearValue() {
      const data = {
        year: this.year,
      }

      this.$emit('change-year', data)
    }
  }
}
</script>
