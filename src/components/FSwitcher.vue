<template>
  <label class="f-switcher">
    <input
      v-model="model"
      :value="value"
      :disabled="disabled"
      type="checkbox"
    >
    <span :class="{ 'mr-2': label }" />
    {{ label }}
  </label>
</template>

<script>
export default {
  name: 'FSwitcher',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: '',
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

  $height: 20px;
.f-switcher {

  display: inline-block;
  position: relative;
  user-select: none;
  font-size: 10px;
  white-space: nowrap;
  cursor: pointer;

  * {
    box-sizing: border-box;
    vertical-align: middle;
  }

  input {
    display: none;

    &:checked ~ span {
      border: 1px solid $dark-blue;
      background: $dark-blue;
      transition: all .2s ease;

      &:before {
        transform: scale3d(0, 0, 0);
      }

      &:after {
        transform: translate3d($height * 0.6, 0, 0);
        border: 1px solid #fff;
      }
    }

    &:active ~ span:after {
      width: $height + ($height / 10);
    }

    &:checked:active ~ span:after {
      transform: translate3d((($height * 0.6) - ($height / 10) - 4px), 0, 0);
    }

    &[disabled] {
      & ~ span {
        cursor: default;

        &:before {
          background: #fff;
        }

        &:after {
          background: #fff;
          border: 1px solid $grey;
        }
      }
    }
  }

  span {
    display: inline-block;
    width: $height * 1.5;
    height: $height;
    position: relative;
    border-radius: $height / 2;
    border: 1px solid $grey;
    background-color: $grey;
    transition: all .6s linear;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: $height / 2;
      transition: all .4s ease;
    }

    &:after {
      content: "";
      display: block;
      width: $height / 2;
      height: $height / 2;
      border-radius: $height / 2;
      background: #fff;
      border: 1px solid #fff;
      position: absolute;
      top: 4px;
      left: 2px;
      transition: all .2s linear;
    }
  }
}
</style>
