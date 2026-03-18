<template>
  <article class="main-hero-news">
    <div class="main-hero-news__media-wrapper">
      <router-link :to="`/${currentLocale}/news/${news.id}`">
        <img :src="news.image" :alt="news.title" class="main-hero-news__img" />
      </router-link>
    </div>
    <div class="main-hero-news__content">
      <h2 class="main-hero-news__title">
        <router-link :to="`/${currentLocale}/news/${news.id}`">{{ news.title }}</router-link>
      </h2>
      <p class="main-hero-news__desc">{{ news.description }}</p>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({
  news: {
    type: Object,
    required: true
  }
})

const { locale } = useI18n()
const currentLocale = computed(() => locale.value)
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as vars;

.main-hero-news {
  display: flex;
  flex-direction: column;
  gap: 15px;

  &__media-wrapper {
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
    
    &:hover {
      transform: scale(1.02);
    }
  }

  &__title {
    font-family: 'Roboto Slab', serif;
    font-size: 28px;
    line-height: 1.2;
    margin: 0 0 10px 0;
    
    a {
      color: vars.$text-color;
      text-decoration: none;
      transition: color 0.2s;
      
      &:hover {
        color: vars.$primary-color;
      }
    }
  }

  &__desc {
    color: #666;
    font-size: 16px;
    line-height: 1.5;
    margin: 0;
  }
  
  @media (max-width: 992px) {
    &__title {
      font-size: 24px;
    }
  }
  
  @media (max-width: 576px) {
    &__title {
      font-size: 22px;
    }
    &__desc {
      font-size: 15px;
    }
  }
}
</style>
