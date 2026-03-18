<template>
  <div class="profile-dropdown" ref="dropdownRef">
    <ul class="profile-dropdown__list">
      <li class="profile-dropdown__item">
        <router-link :to="`/${currentLocale}/profile`" class="profile-dropdown__link" @click="$emit('close')">
          {{ $t('header.profile') }}
        </router-link>
      </li>
      <li class="profile-dropdown__item">
        <router-link :to="`/${currentLocale}/comments`" class="profile-dropdown__link" @click="$emit('close')">
          {{ $t('header.comments') }}
        </router-link>
      </li>
      <li class="profile-dropdown__separator"></li>
      <li class="profile-dropdown__item">
        <router-link :to="`/${currentLocale}/logout`" class="profile-dropdown__link profile-dropdown__link--logout" @click="$emit('close')">
          <span>{{ $t('header.logout') }}</span>
          <IconLogout class="profile-dropdown__logout-icon" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import IconLogout from './icons/IconLogout.vue'

const { locale } = useI18n()
const currentLocale = computed(() => locale.value)
const emit = defineEmits(['close'])
const dropdownRef = ref(null)

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    emit('close')
  }
}

onMounted(() => {
  setTimeout(() => {
    document.addEventListener('click', handleClickOutside)
  }, 0)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as vars;

.profile-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 100;
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
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 8px 0;
    position: relative;
    background-color: #ffffff;
    z-index: 2;
  }

  &__item {
    display: block;
  }

  &__separator {
    height: 1px;
    background-color: #f0f0f0;
    margin: 8px 0;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    color: vars.$text-color;
    text-decoration: none;
    font-size: 14px;
    font-weight: 400;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
      color: #000000;
    }

    &--logout {
      color: vars.$text-color;
      transition: all 0.2s ease;

      &:hover {
        background-color: rgba(0, 0, 0, 0.03);
        color: #000000;
        
        .profile-dropdown__logout-icon {
          color: #000000;
        }
      }
    }
  }

  &__logout-icon {
    width: 18px;
    height: 18px;
    color: #4B99F5;
    transition: transform 0.2s;
  }
}
@media (max-width: 768px) {
  .profile-dropdown {
    right: -10px;
    &::before {
      right: 25px;
    }
  }
}
</style>
