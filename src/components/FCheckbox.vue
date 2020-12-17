<template>
  <label 
    :for="id"
    :class="{'f-checkbox__label--column': isLabelInColumn}"
    class="f-checkbox__label" 
  >
    <span v-if="label">
      {{ label }}
    </span>
    <input
      :id="id"
      v-model="model"
      :value="value"
      :disabled="disabled"
      :name="name"
      type="checkbox"
    >
    <span class="checkmark" />
    <slot />
  </label>
</template>

<script>
export default {
  name: 'FCheckbox',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Boolean],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: [Boolean, Array],
      default: false,
    },
    name: {
      type: String,
      default: ''
    },
    id: {
      type: [String, undefined],
      default: undefined
    },
    isLabelInColumn: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    model: {
      get() {
        return this.checked;
      },
      set(val) {
        this.$emit('change', val);
      },
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.f-checkbox {
  &__label {
    display: block;
    position: relative;
    min-height: 16px;
    padding-left: 35px;
    font-size: 10px;
    user-select: none;

    .checkmark {
      position: absolute;
      top: 0;
      left: 10px;
      height: 16px;
      width: 16px;
      background-color: #fff;
      border: 1px solid $grey;
      cursor: pointer;

      &:after {
        content: "";
        position: absolute;
        display: none;
        left: 7px;
        top: -4px;
        width: 7px;
        height: 15px;
        border: solid $green;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;

      &:checked ~ .checkmark:after {
        display: block;
      }

      &:disabled ~ .checkmark {
        background-color: rgba($grey, 0.6);
        cursor: default;
      }
    }

    &--column {
      padding-left: 0;
      padding-top: 20px;
    }
  }
}
</style>