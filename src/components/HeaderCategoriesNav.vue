<template>
  <nav class="categories-nav">
    <div class="container categories-nav__inner">
      <ul class="categories-nav__list">
        <li v-for="cat in visibleCategories" :key="cat.id" class="categories-nav__item">
          <router-link 
            :to="`/${currentLocale}/category/${cat.id}`" 
            class="categories-nav__link"
            active-class="categories-nav__link--active"
          >
            {{ $t(`menu.${cat.id}`) }}
          </router-link>
        </li>
        <li class="categories-nav__item">
          <MoreCategoriesDropdown 
            :items="dropdownCategories" 
            :is-active="isDropdownActive"
          />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import MoreCategoriesDropdown from './MoreCategoriesDropdown.vue'

const { locale } = useI18n()
const currentLocale = computed(() => locale.value)
const route = useRoute()

const categories = [
  { id: 'main' },
  { id: 'incidents' },
  { id: 'society' },
  { id: 'economy' },
  { id: 'politics' },
  { id: 'education' },
  { id: 'medicine' },
  { id: 'video' },
  { id: 'photo' },
  { id: 'entertainment' }
]

const visibleCategories = computed(() => categories.slice(0, 10))
const dropdownCategories = computed(() => categories.slice(10))

const isDropdownActive = computed(() => {
  return dropdownCategories.value.some(cat => 
    route.path.includes(`/category/${cat.id}`)
  )
})
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as vars;

.categories-nav {
  

  &__inner {
    overflow: hidden;
    margin-inline: -15px;
    padding-inline: 15px;
  }

  &__list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 32px;
  
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__item {
    display: flex;
    align-items: stretch;

    &:first-child {
      margin: 0 0 0 32px;
    }

    &:last-child {
      margin: 0 32px 0 0;
    }
  }

  &__link {
    color: #ffffff;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    padding: 24px 0;
    white-space: nowrap;
    position: relative;
    transition: color 0.2s;

    &:hover {
      color: vars.$primary-color;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0px;
        left: 0;
        right: 0;
        height: 4px;
        background-color: vars.$primary-color;
      }
    }

    &--active {
      color: #ffffff;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 4px;
        background-color: vars.$primary-color;
      }
    }

    @media (max-width: 1024px) {
      padding: 16px 0;
    }
  }
}

</style>
