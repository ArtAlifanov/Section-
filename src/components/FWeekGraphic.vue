<template>
  <div
    class="f-week-graphic d-flex justify-space-between mr-2 mb-4"
    :class="{ 'flex-column': isNarrowColumns }"
  >
    <div class="d-flex justify-space-between">
      <div
        v-for="(day, index) in items"
        :key="index"
        class="f-week-graphic__full-column d-flex align-end mr-1"
        :style="{ 'width': columnWidth }"
      >
        <div
          :style="{ 'height': heightOfDynamicColumn(day.percentile), 'width': columnWidth }"
          class="f-week-graphic__dynamic-column"
        />
        <div
          v-if="!isNarrowColumns"
          class="f-week-graphic__day d-flex justify-center"
        >
          {{ day.dayOfWeek.slice(0, 3) }}
        </div>
      </div>
    </div>
    <div
      v-if="isNarrowColumns"
      class="f-week-graphic__average-report"
    >
      {{ $t("date.week") }}: {{ averageValueForGraphic }} %
    </div>
  </div>
</template>

<script>
export default {
  name: 'FWeekGraphic',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    width: {
      type: String,
      default: '100px'
    },
    isNarrowColumns: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    columnWidth() {
      return this.isNarrowColumns ? '10px' : '25px'
    },
    averageValueForGraphic() {
      return Math.round(this.items.reduce((acc, item) => acc + item.percentile, 0) / this.items.length)
    }
  },
  methods: {
    heightOfDynamicColumn(columnHeight) {
      // const HEIGHT_OF_DYNAMIC_COLUMN_THAT_OVERLAYS_STATIC_COLUMN = 98

      return columnHeight > 98 ? '98px' : `${columnHeight}px`
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.f-week-graphic {
  &__full-column {
    position: relative;
    height: 100px;
    border-radius: 5px 5px 0px 0px;
    border: 1px solid $grey;
  }

  &__dynamic-column {
    background-color: $light-blue;
    border-radius: 4px 4px 0px 0px;
  }

  &__day {
    position: absolute;
    bottom: -24px;
    font-size: 8px;
    font-weight: 500;
  }

  &__average-report {
    display: flex;
    justify-content: center;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 11px;
    margin-top: 8px;
  }
}
</style>
