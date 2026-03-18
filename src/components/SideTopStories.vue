<template>
  <aside class="side-top-stories">
    <swiper
      v-if="isMobile"
      slides-per-view="auto"
      class="side-top-stories__slider"
    >
      <swiper-slide v-for="story in stories" :key="story.id">
        <article class="side-top-stories__card">
          <div class="side-top-stories__media">
            <router-link :to="`/${currentLocale}/news/${story.id}`">
              <img :src="story.image" :alt="story.title" class="side-top-stories__img" />
            </router-link>
          </div>
          <h3 class="side-top-stories__title">
            <router-link :to="`/${currentLocale}/news/${story.id}`">{{ story.title }}</router-link>
          </h3>
        </article>
      </swiper-slide>
    </swiper>

    <div v-else class="side-top-stories__list">
      <article v-for="story in stories" :key="story.id" class="side-top-stories__card">
        <div class="side-top-stories__media">
          <router-link :to="`/${currentLocale}/news/${story.id}`">
            <img :src="story.image" :alt="story.title" class="side-top-stories__img" />
          </router-link>
        </div>
        <h3 class="side-top-stories__title">
          <router-link :to="`/${currentLocale}/news/${story.id}`">{{ story.title }}</router-link>
        </h3>
      </article>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

defineProps({
  stories: {
    type: Array,
    required: true
  }
})

const { locale } = useI18n()
const currentLocale = computed(() => locale.value)

const isMobile = ref(false)
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as vars;

.side-top-stories {
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;

  &__slider {
    width: 100%;
    
    :deep(.swiper) {
      overflow: visible; 
      padding: 0 12px; 
      width: 100%;
    }

    :deep(.swiper-slide) {
      margin-right: 0 !important;
      margin-left: 20px;

      &:last-child {
        margin-right: 20px !important;
      }
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    
    .swiper-slide & {
      width: 300px;
    }
  }

  &__media {
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 16/9;
    display: block;
    transition: transform 0.3s ease;
    min-width: 276px;
    min-height: 156px;
    max-width: 300px;
    max-height: 170px;
    
    &:hover {
      transform: scale(1.05);
    }
  }

  &__title {
    font-family: 'Roboto Slab', serif;
    font-size: 18px;
    line-height: 1.3;
    margin: 0;
    
    a {
      color: vars.$text-color;
      text-decoration: none;
      transition: color 0.2s;
      
      &:hover {
        color: vars.$primary-color;
      }
    }
  }
  
  @media (max-width: 992px) {
    &__list {
      flex-direction: row;
      flex-wrap: wrap;
    }
    &__card {
      flex: 1 1 calc(50% - 10px);
    }
  }

  @media (max-width: 576px) {
    &__list {
      flex-direction: column;
    }
  }
}
</style>
