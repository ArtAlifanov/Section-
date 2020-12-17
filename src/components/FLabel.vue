<template>
  <div
    :class="{
      'f-label--new': isNew,
      'f-label--draft': isDraft,
      'f-label--rejected': isRejected,
      'f-label--submitted': isSubmitted,
      'f-label--approved': isApproved,
      'cursor-pointer': isCursorPointer
    }"
    class="f-label d-flex align-center px-3"
    @click="labelClick($event)"
  >
    <span class="f-label__text">
      {{ text }}
    </span>
    <span 
      class="f-label__icon d-flex justify-center align-center"
      :class="{'cursor-pointer': isCursorPointer}"
      @click="iconClick($event)"
    >
      <FIcon
        v-if="!labelCounter"
        name="view"
        :color="colors.blue"
      />
      <span 
        v-else
        class="f-label__counter d-flex justify-center align-center"  
      >
        {{ labelCounter }}
      </span>
    </span>
  </div>
</template>

<script>
import FIcon from './FIcon'
import colors from '../styles/colors'

export default {
  name: 'FLabel',
  components: {
    FIcon,
  },
  props: {
    text: {
      type: String,
      default: 'new'
    },
    isNew: {
      type: Boolean,
      default: false
    },
    isDraft: {
      type: Boolean,
      default: false
    },
    isRejected: {
      type: Boolean,
      default: false
    },
    isSubmitted: {
      type: Boolean,
      default: false
    },
    isApproved: {
      type: Boolean,
      default: false
    },
    labelCounter: {
      type: String,
      required: false
    },
    isCursorPointer: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.colors = colors
  },
  methods: {
    iconClick(e) {
      this.$emit('icon-click', e)
    },
    labelClick(e) {
      this.$emit('label-click', e)
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';

.f-label {
  position: relative;
  width: 105px;
  height: 28px;
  font-size: 10px;
  font-weight: 700;
  border: 1px solid;
  border-radius: 100px;
  text-transform: uppercase;

  &__icon {
    position: absolute;
    right: 0;
    width: 24px;
    height: 24px;
    border-radius: 100px;
    background-color: #fff;
  }

  &__counter {
    width: 100%;
    height: 100%;
  }

  &--new {
    background-color: #fff;
    border-color: $grey;
    border-right-width: 0;

    .f-label__icon {
      border: 1px solid $grey;
    }
  }

  &--draft {
    background-color: $yellow;
    border-color: $dark-yellow;
  }

  &--rejected {
    background-color: $light-red;
    border-color: $red;
  }

  &--submitted {
    background-color: $light-blue;
    border-color: $dark-blue;
  }

  &--approved {
    background-color: $light-green;
    border-color: $green;
  }
}
</style>