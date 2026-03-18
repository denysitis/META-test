<template>
  <div class="more-dropdown" ref="dropdownRef">
    <button 
      class="more-dropdown__trigger" 
      :class="{ 
        'more-dropdown__trigger--open': isOpen,
        'more-dropdown__trigger--active': isActive
      }"
      @click="toggle"
      type="button"
    >
      <span>{{ $t('menu.more') }}</span>
      <svg 
        class="more-dropdown__arrow" 
        width="12" 
        height="14" 
        viewBox="0 0 12 14" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.837 4.48122L11.3066 3.95086C11.1807 3.82497 10.9771 3.82497 10.8513 3.95086L6.00036 8.79104L1.14947 3.95086C1.02358 3.82497 0.820006 3.82497 0.694113 3.95086L0.163756 4.48122C0.0378627 4.60711 0.0378627 4.81069 0.163756 4.93658L5.77268 10.5455C5.89858 10.6714 6.10215 10.6714 6.22804 10.5455L11.837 4.93658C11.9629 4.81069 11.9629 4.60711 11.837 4.48122V4.48122Z" fill="#4B99F5"/>
      </svg>
    </button>

    <transition name="fade">
      <ul v-if="isOpen" class="more-dropdown__list">
        <li v-for="item in items" :key="item.id" class="more-dropdown__item">
          <router-link 
            :to="`/${currentLocale}/category/${item.id}`" 
            class="more-dropdown__link"
            active-class="more-dropdown__link--active"
            @click="close"
          >
            {{ $t(`menu.${item.id}`) }}
          </router-link>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({
  items: {
    type: Array,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

const { locale } = useI18n()
const currentLocale = computed(() => locale.value)

const isOpen = ref(false)
const dropdownRef = ref(null)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    close()
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as vars;

.more-dropdown {
  position: relative;
  display: flex;
  align-items: center;

  &__trigger {
    background: none;
    border: none;
    color: #ffffff;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    padding: 24px 0 26px;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: vars.$primary-color;
    }

    &--open,
    &--active {
      color: #ffffff;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 4px;
        background-color: vars.$primary-color;
      }

      .more-dropdown__arrow {
        transform: rotate(180deg);
      }
    }

    @media (max-width: 1024px) {
      padding: 16px 0;
    }
  }

  &__arrow {
    transition: transform 0.3s ease;
  }

  &__list {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 8px 0;
    list-style: none;
    margin: 10px 0 0;
    min-width: 200px;
    z-index: 100;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: -6px;
      right: 15px;
      width: 12px;
      height: 12px;
      background-color: #ffffff;
      transform: rotate(45deg);
      box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.04);
      z-index: 1;
    }
  }

  &__item {
    display: block;
    position: relative;
    z-index: 2;
  }

  &__link {
    display: block;
    padding: 10px 20px;
    color: vars.$text-color;
    text-decoration: none;
    font-size: 14px;
    font-weight: 400;
    transition: background-color 0.2s, color 0.2s;
    text-transform: none;

    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
      color: #000000;
    }

    &--active {
      color: #000000;
      background-color: rgba(0, 0, 0, 0.03);
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
