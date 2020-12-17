<template>
  <v-btn
    :color="buttonColor"
    :rounded="isRounded"
    :dark="isDark"
    :outlined="isOutlined"
    :x-large="isLarge"
    depressed
    :disabled="isDisabled"
    :min-width="minWidth"
    :min-height="minHeight"
    :max-width="maxWidth"
    :max-height="maxHeight"
    :type="type"
    :class="{'px-0': withoutPadding}"
    class="f-button"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <f-icon
      v-if="icon"
      :color="iconColor"
      :size="iconSize"
      :class="{ 'mr-2': text }"
      :name="icon"
    />
    {{ text }}
  </v-btn>
</template>

<script>
import FIcon from '@/components/FIcon'
export default {
	name: 'Button',
	components: {
		FIcon
	},
	props: {
		text: {
			type: String,
			default: ''
		},
		color: {
			type: String,
			default: ''
		},
		icon: {
			type: String,
			default: ''
		},
		iconColor: {
			type: String,
			default: ''
		},
		iconSize: {
			type: String,
			default: '16px'
		},
		isRounded: {
			type: Boolean,
			defautl: false
		},
		isDark: {
			type: Boolean,
			default: false
		},
		isOutlined: {
			type: Boolean,
			default: false
		},
		isLarge: {
			type: Boolean,
			default: false
		},
		minWidth: {
			type: [String, Number],
			default: ''
		},
		minHeight: {
			type: [String, Number],
			default: ''
		},
		maxWidth: {
			type: [String, Number],
			default: ''
		},
		maxHeight: {
			type: [String, Number],
			default: ''
		},
		withoutPadding: {
			type: Boolean,
			default: false
		},
		isDisabled: {
			type: Boolean,
			default: false
		},
		disabledColor: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: 'button'
		}
	},
	computed: {
		buttonColor() {
			return this.isDisabled ? this.disabledColor : this.color
		}
	}
}
</script>