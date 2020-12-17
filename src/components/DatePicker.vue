<template>
  <v-menu
    v-model="datepickerMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    :dark="dark"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-mask="'##.##.####'"
        :readonly="readonly"
        :value="formattedValue"
        type="tel"
        placeholder="dd.mm.yyyy"
        outlined
        :dark="dark"
        :label="label"
        :rules="[
          (v) => !required || !((v || '').length === 0) || $t('required.date'),
          (v) => (v || '').length === 0 || isLocalDateValid(v) || $t('invalid.date'),
          (v) => !max || isMaxValid(v) || $t('invalid.max-date', { max: formatIsoDateToLocal(max) }),
          (v) => !min || isMinValid(v) || $t('invalid.min-date', { min: formatIsoDateToLocal(min) }),
          ...rules
        ]"
        v-on="on"
        @input="parseValue"
      >
        <template
          v-if="isActiveCalendarButton"
          v-slot:append
        >
          <v-btn
            :disabled="readonly"
            x-small
            v-on="on"
          >
            <v-icon
              x-small
              class="mr-1"
            >
              event
            </v-icon>
            {{ $t(`action.${datepickerMenu ? 'close' : 'open'}.calendar`) }}
          </v-btn>
        </template>
      </v-text-field>
    </template>
    <v-date-picker
      :readonly="readonly"
      :value="value"
      first-day-of-week="1"
      reactive
      :dark="dark"
      :min="min"
      :max="max"
      @input="handleDatepickeInput"
    />
  </v-menu>
</template>

<script>
import { mask } from 'vue-the-mask'
export default {
    name: 'DatePicker',
    directives: {
      mask
    },
    props: {
      value: {
        type: String,
        required: true
      },
      readonly: {
        type: Boolean,
        required: false
      },
      min: {
        type: String,
        required: false,
        default: undefined
      },
      max: {
        type: String,
        required: false,
        default: undefined
      },
      label: {
        type: String,
        required: true
      },
      rules: {
        type: Array,
        default: () => []
      },
      required: {
        type: Boolean,
        required: false
      },
      dark: {
        type: Boolean,
        default: false,
      },
      isActiveCalendarButton: {
        type: Boolean,
        default: false,
      }
    },

    data: () => ({
      datepickerMenu: false
    }),

    computed: {
      formattedValue() {
        return this.formatIsoDateToLocal(this.value)
      },
    },

    watch: {
      value() {
        this.$emit('input', this.value);
      }
    },

    methods: {
      isMaxValid(date) {
        const inputDate = this.$moment(date, 'DD.MM.YYYY')
        const maxDate = this.$moment(this.max, 'YYYY-MM-DD')
        const tooBig = inputDate > maxDate
        return !tooBig
      },
      isMinValid(date) {
        const inputDate = this.$moment(date, 'DD.MM.YYYY')
        const minDate = this.$moment(this.min, 'YYYY-MM-DD')
        const tooSmall = inputDate < minDate
        return !tooSmall
      },
      handleDatepickeInput(value) {
          this.datepickerMenu = false
          this.$emit('input', value);
      },
      formatIsoDateToLocal(date) {
        if (this.isIsoDateValid(date)) {
          return this.$moment(date, 'YYYY-MM-DD', true).format('DD.MM.YYYY')
        }
        return ''
      },
      isLocalDateValid(date) {
        const isValid = date && this.$moment(date, 'DD.MM.YYYY', true).isValid()
        return isValid
      },
      parseValue(date) {
        if (!this.isLocalDateValid(date)) {
          return false
        }
        this.$emit('input', this.formatLocalDateToIso(date));
      },
      isIsoDateValid(date) {
        const isValid = date && this.$moment(date, 'YYYY-MM-DD', true).isValid()
        return isValid
      },
      formatLocalDateToIso(date) {
        if (this.isLocalDateValid(date)) {
          return this.$moment(date, 'DD.MM.YYYY', true).format('YYYY-MM-DD')
        }
        return ''
      },
    }
  }
</script>
