<template>
  <header class="header">
    <div class="header__top">
      <div class="container header__top-inner">
        
        <div class="header__top-left">
          <button class="header__burger" @click="toggleMobileMenu" aria-label="Toggle Menu">
            <span class="header__burger-line"></span>
            <span class="header__burger-line"></span>
            <span class="header__burger-line"></span>
          </button>

          <router-link :to="`/${currentLocale}`" class="header__logo">
            <img src="@/assets/icons/logo.svg" alt="Logo" class="header__logo-img" />
          </router-link>
        </div>

        <nav class="header__nav-main" :class="{ 'header__nav-main--open': isMobileMenuOpen }">
          <ul class="header__nav-list">
            <li v-for="category in menuCategories" :key="category.id" class="header__nav-item">
              <router-link :to="`/${currentLocale}/${category.id}`" class="header__nav-link" @click="closeMobileMenu">
                {{ $t(category.labelKey) }}
              </router-link>
            </li>
          </ul>
        </nav>

        <div class="header__actions">
          <div class="header__lang">
            <button 
              class="header__lang-btn" 
              :class="{ 'header__lang-btn--active': currentLocale === 'ua' }" 
              @click="switchLocale('ua')"
            >UA</button>
            <button 
              class="header__lang-btn" 
              :class="{ 'header__lang-btn--active': currentLocale === 'ru' }" 
              @click="switchLocale('ru')"
            >RU</button>
          </div>
          <div class="header__icons">
            <button class="header__icon-btn" aria-label="Search">
              <IconSearch />
            </button>
            <button class="header__icon-wrapper header__icon-btn" aria-label="Notifications">
              <IconNotifications />
              <span class="header__notification-badge">1</span>
            </button>
            <div class="header__dropdown-wrapper">
              <button 
                class="header__icon-btn" 
                :class="{ 'header__icon-btn--active': isProfileOpen }"
                aria-label="Profile" 
                @click.stop="isProfileOpen = !isProfileOpen"
              >
                <IconProfile />
              </button>
              <HeaderProfileDropdown v-if="isProfileOpen" @close="isProfileOpen = false" />
            </div>
            <button class="header__icon-btn header__icon-btn--desktop-only" aria-label="Mail">
              <IconMail />
            </button>
          </div>
        </div>

      </div>
    </div>
    
    <HeaderCategoriesNav />
    <SidebarMenu :is-open="isSidebarOpen" @close="isSidebarOpen = false" />
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { menuCategories } from '../data/mockNews'
import HeaderCategoriesNav from './HeaderCategoriesNav.vue'
import HeaderProfileDropdown from './HeaderProfileDropdown.vue'
import SidebarMenu from './SidebarMenu.vue'
import IconSearch from './icons/IconSearch.vue'
import IconNotifications from './icons/IconNotifications.vue'
import IconProfile from './icons/IconProfile.vue'
import IconMail from './icons/IconMail.vue'

const router = useRouter()
const route = useRoute()
const { locale } = useI18n()

const isMobileMenuOpen = ref(false)
const isProfileOpen = ref(false)
const isSidebarOpen = ref(false)

const currentLocale = computed(() => locale.value)

const toggleMobileMenu = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const switchLocale = (newLocale) => {
  if (currentLocale.value === newLocale) return
  
  const newPath = route.fullPath.replace(`/${currentLocale.value}`, `/${newLocale}`)
  
  router.push(newPath)
}
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as vars;

.header {
  background-color: #343434;
  
  &__top {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &-left {
      display: flex;
      align-items: center;
      gap: 32px;

      @media (max-width: 400px) {
        gap: 24px;
      }
    }
  }

  &__top-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    gap: 36px;
    padding: 0 16px;

    @media (max-width: 400px) {
      gap: 16px;
    }
  }

  &__burger {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    
    &-line {
      width: 30px;
      height: 3px;
      background: #ffffff;
      border-radius: 2px;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    &-img {
      max-height: 40px;
    }
  }

  &__nav-main {
    flex: 1;
    margin: 0 20px;
  }

  &__nav-list {
    display: flex;
    list-style: none;
    gap: 20px;
    margin: 0;
    padding: 0;
  }

  &__nav-link {
    color: vars.$primary-color;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    transition: color 0.2s;
    
    &:hover, &.router-link-active {
      color: #ffffff;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 26px;

    @media (max-width: 400px) {
     gap: 23px;
    }
  }

  &__lang {
    display: flex;
    gap: 6px;
    &-btn {
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      font-weight: 500;
      font-size: 12px;
      padding: 0;
      font-family: 'Roboto', sans-serif;
      text-transform: uppercase;
      
      &--active {
        color: vars.$primary-color;
      }
      
      &:hover {
        color: #ffffff;
      }
    }
  }

  &__icons {
    display: flex;
    gap: 20px;
    align-items: center;

    @media (max-width: 400px) {
     gap: 16px;
    }
  }

  &__icon-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__notification-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    background-color: #ff8b22;
    color: #000;
    font-size: 11px;
    font-weight: 700;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__dropdown-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__icon-btn {
    background: transparent;
    border: none;
    color: #ffffff;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    transition: color 0.2s;
    
    &:hover, &--active {
      color: vars.$primary-color;
    }

    &--desktop-only {
      @media (max-width: 992px) {
        display: none;
      }
    }
  }

  @media (max-width: 992px) {
    &__nav-main {
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      background-color: #2e2e2e;
      z-index: 100;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      

      height: 0;
      overflow: hidden;
      transition: height 0.3s ease;
      
      &--open {
        height: auto;
        padding: 20px 0;
      }
    }

    &__nav-list {
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }
  }

}
</style>
