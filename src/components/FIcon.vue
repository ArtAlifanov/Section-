<template>
  <span class="f-icon__container">
    <i 
      :class="{[`f-icon__${name}`]: name}"
      :style="{
        'font-size': size, 
        'cursor': cursor, 
        'color': color
      }"
      class="f-icon"
    />
    <slot />
  </span>
</template>  

<script>
export default {
  name: 'FIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '24px'
    },
    cursor: {
      type: String,
      default: 'default'
    },
    color: {
      type: String,
      default: '#2A3756'
    },
  }
}
</script>  

<style lang="scss">
@import '@/styles/variables.scss';

@font-face {
  font-family: 'fontello';
  src: url('../icons/fontello.eot');
  src: 
    url('../icons/fontello.eot') format('embedded-type'),
    url('../icons/fontello.ttf') format('truetype'),
    url('../icons/fontello.woff') format('woff'),
    url('../icons/fontello.svg#fontello') format('svg');
  font-weight: 400;
  font-style: normal;
}

.f-icon {
  font-family: 'fontello' !important;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  &__container {
    position: relative;
    display: inherit;
  }

  &__badge {
    position: absolute;
    top: -5px;
    right: -5px;
    height: 12px;
    width: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: $red;
    padding: 2px;
    font-size: 8px;
    color: #fff;
  }
}

.f-icon__add::before {
  content: '\e800';
}

.f-icon__admin::before {
  content: '\e801';
}

.f-icon__attach::before {
  content: '\e802';
}

.f-icon__bottom::before {
  content: '\e803';
}

.f-icon__calendar::before {
  content: '\e804';
}

.f-icon__check::before {
  content: '\e805';
}

.f-icon__clear::before {
  content: '\e806';
}

.f-icon__close::before {
  content: '\e807';
}

.f-icon__dashboard::before {
  content: '\e808';
}

.f-icon__daybook-manager::before {
  content: '\e809';
}

.f-icon__delete::before {
  content: '\e80a';
}

.f-icon__download::before {
  content: '\e80b';
}

.f-icon__egenkontroll::before {
  content: '\e80c';
}

.f-icon__faq::before {
  content: '\e80d';
}

.f-icon__forms::before {
  content: '\e80e';
}

.f-icon__hide::before {
  content: '\e80f';
}

.f-icon__info::before {
  content: '\e810';
}

.f-icon__left::before {
  content: '\e811';
}

.f-icon__list-order::before {
  content: '\e812';
}

.f-icon__my-checklists::before {
  content: '\e813';
}

.f-icon__my-daybook::before {
  content: '\e814';
}

.f-icon__notifications::before {
  content: '\e815';
}

.f-icon__places::before {
  content: '\e816';
}

.f-icon__plan::before {
  content: '\e817';
}

.f-icon__reports::before {
  content: '\e818';
}

.f-icon__right::before {
  content: '\e819';
}

.f-icon__search::before {
  content: '\e81a';
}

.f-icon__settings::before {
  content: '\e81b';
}

.f-icon__sort::before {
  content: '\e81c';
}

.f-icon__time::before {
  content: '\e81d';
}

.f-icon__top::before {
  content: '\e81e';
}

.f-icon__user::before {
  content: '\e81f';
}

.f-icon__users::before {
  content: '\e820';
}

.f-icon__view::before {
  content: '\e821';
}

.f-icon__hr::before {
  content: '\e822';
}

.f-icon__arrowup::before {
  content: '\e823';
}
</style>