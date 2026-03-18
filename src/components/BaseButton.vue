<template>
  <component 
    :is="to ? 'router-link' : 'a'" 
    :to="to" 
    :href="href" 
    class="base-button"
  >
    <span class="base-button__text"><slot>{{ text }}</slot></span>
    <span class="base-button__icon">
      <IconArrow />
    </span>
  </component>
</template>

<script setup>
import IconArrow from './icons/IconArrow.vue'

defineProps({
  text: {
    type: String,
    default: ''
  },
  to: {
    type: [String, Object],
    default: undefined
  },
  href: {
    type: String,
    default: undefined
  }
})
</script>

<style lang="scss" scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 11px 20px 11px 28px;
  border-radius: 30px;
  border: 2px solid #1976D2;
  color: #000000;
  background-color: transparent;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  width: 100%;
  letter-spacing: 0px;
  line-height: 1;
  transition: all 0.3s ease;

  &:hover {
    background-color: #1976D2;
    color: #ffffff;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 21px;
      height: 24px;
    }
  }

  @media (max-width: 1024px) {
    width: calc(100% - 44px);
    max-width: 276px;
  }
}
</style>
