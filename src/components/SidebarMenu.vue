<template>
  <div class="sidebar">
    <transition name="fade">
      <div v-if="isOpen" class="sidebar__overlay" @click="$emit('close')"></div>
    </transition>
    
    <transition name="slide">
      <aside v-if="isOpen" class="sidebar__panel">
        <div class="sidebar__header">
          <router-link :to="`/${currentLocale}`" class="sidebar__logo" @click="$emit('close')">
            <img src="@/assets/icons/logo-black.svg" alt="Meta">
          </router-link>
        </div>

        <div class="sidebar__content">
          <section class="sidebar__section">
            <h4 class="sidebar__section-title">{{ $t('sidebar.rubrics') }}</h4>
            <ul class="sidebar__menu">
              <li v-for="item in rubrics" :key="item.id" class="sidebar__menu-item">
                <router-link 
                  :to="`/${currentLocale}/category/${item.id}`" 
                  class="sidebar__menu-link"
                  @click="$emit('close')"
                >
                  {{ $t(`menu.${item.id}`) }}
                </router-link>
              </li>
            </ul>
          </section>

          <section class="sidebar__section">
            <h4 class="sidebar__section-title">{{ $t('sidebar.projects') }}</h4>
            <ul class="sidebar__menu">
              <li v-for="item in projects" :key="item.id" class="sidebar__menu-item">
                <a href="#" class="sidebar__menu-link">{{ $t(`sidebar.project_${item.id}`) }}</a>
              </li>
            </ul>
          </section>
        </div>

        <div class="sidebar__footer">
          <div class="sidebar__toggle-row">
            <span>{{ $t('sidebar.dark_theme') }}</span>
            <label class="switch">
              <input type="checkbox" v-model="isDarkTheme">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="sidebar__toggle-row">
            <span>{{ $t('sidebar.news_text') }}</span>
            <div class="sidebar__lang-toggle">
              <button 
                :class="{ 'active': currentLocale === 'ua' }" 
                @click="switchLocale('ua')"
              >UA</button>
              <button 
                :class="{ 'active': currentLocale === 'ru' }" 
                @click="switchLocale('ru')"
              >RU</button>
            </div>
          </div>
        </div>
      </aside>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const { locale, t } = useI18n()
const router = useRouter()
const route = useRoute()

const currentLocale = computed(() => locale.value)
const isDarkTheme = ref(false)

const rubrics = [
  { id: 'news' },
  { id: 'regions' },
  { id: 'sport' },
  { id: 'stakes' },
  { id: 'finance' },
  { id: 'showbiz' },
  { id: 'lifestyle' },
  { id: 'health' },
  { id: 'it' },
  { id: 'auto' }
]

const projects = [
  { id: 'mail' },
  { id: 'weather' },
  { id: 'tv' },
  { id: 'maps' },
  { id: 'translator' }
]

const switchLocale = (newLocale) => {
  if (currentLocale.value === newLocale) return
  const newPath = route.fullPath.replace(`/${currentLocale.value}`, `/${newLocale}`)
  router.push(newPath)
}

const handleEsc = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEsc)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEsc)
})
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as vars;

.sidebar {
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1000;
  }

  &__panel {
    position: fixed;
    top: 0;
    left: 0;
    width: 320px;
    height: 100vh;
    background: #fff;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
    color: #000;
  }

  &__header {
    padding: 40px 10px 37px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: center;
  }

  &__logo {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    
    &-bracket {
      color: vars.$primary-color;
      font-size: 32px;
      font-weight: 300;
    }
    &-text {
      color: #000;
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 2px;
    }
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    padding: 20px 0 0 0;

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: #ddd;
      border-radius: 2px;
    }
  }

  &__section {
    padding-bottom: 32px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    margin: 0 0 20px 0;
    
    &-title {
      padding: 0 32px;
      font-size: 14px;
      color: vars.$primary-color;
      text-transform: none;
      margin-bottom: 10px;
      font-weight: 300;
    }
  }

  &__menu {
    list-style: none;
    padding: 0;
    margin: 0;

    &-item {
      width: 100%;
    }

    &-link {
      display: block;
      padding: 12px 32px;
      color: #000;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      transition: background 0.2s;

      &:hover, &.router-link-active {
        background: rgba(0, 0, 0, 0.05);
      }
      
      &.router-link-active {
        color: vars.$primary-color;
      }
    }
  }

  &__footer {
    padding: 20px 32px 58px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
  }

  &__toggle-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
    padding: 12px 0;
    font-weight: 500;
  }

  &__lang-toggle {
    display: flex;
    gap: 12px;
    
    button {
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.4);
      padding: 0;
      font-size: 14px;
      
      &.active {
        color: vars.$primary-color;
      }
    }
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
}

.slider {
  position: absolute;
  inset: 0;
  cursor: pointer;
  background-color: transparent;
  border: 2px solid vars.$primary-color;
  border-radius: 12px;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 3px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: vars.$primary-color;
    transform: translateY(-50%);
    transition: transform 0.3s ease, background-color 0.3s ease;
  }
}

input:checked + .slider {
  background-color: vars.$primary-color;
}

input:checked + .slider::before {
  background-color: #fff;
  transform: translate(18px, -50%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
